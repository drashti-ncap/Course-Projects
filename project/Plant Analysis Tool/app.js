require("dotenv").config();

const express = require("express");
const multer = require("multer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const port = process.env.PORT || 5000;

// Create upload folder automatically
const uploadDir = path.join(__dirname, "upload");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer
const upload = multer({
    dest: uploadDir,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});
// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// Gemini Initialization (latest SDK)
const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});



// Analyze plant image
app.post("/analyze", upload.single("plantImage"), async (req, res) => {

    try {

        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No image uploaded"
            });
        }
        //AI readable format image
        const imageData =
            await fsPromises.readFile(
                req.file.path,
                "base64"
            );

        const result =
            await genAI.models.generateContent({ model: "gemini-3.5-flash",

                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text:
                                    "Identify plant and give the care advice in 30 words."
                            },
                            {
                                inlineData: {
                                    mimeType:
                                        req.file.mimetype,
                                    data:
                                        imageData
                                }
                            }
                        ]
                    }
                ],

                config: {
                    maxOutputTokens: 150
                }
            });

        await fsPromises.unlink(
            req.file.path
        );

        return res.json({
            success: true,
            result:
                result.text ||
                "No analysis generated"
        });

    } catch (err) {

        console.error(
            "SERVER ERROR:",
            err
        );

        return res.status(500).json({
            success: false,
            error:
                err.message ||
                "Internal Server Error"
        });
    }
});
// Download route
app.post("/download", express.json(), async (req, res) => {
    const { result, image } = req.body;
    try {
        //Ensure the reports directory exists
        const reportsDir = path.join(__dirname, "reports");
        await fsPromises.mkdir(reportsDir, { recursive: true });
        //generate pdf
        const filename = `plant_analysis_report_${Date.now()}.pdf`;
        const filePath = path.join(reportsDir, filename);
        const writeStream = fs.createWriteStream(filePath);
        const doc = new PDFDocument();
        doc.pipe(writeStream);
        // Add content to the PDF
        doc.fontSize(24).text("Plant Analysis Report", {
            align: "center",
        });
        doc.moveDown();
        doc.fontSize(24).text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();
        doc.fontSize(14).text(result, { align: "left" });
        //insert image to the pdf
        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            doc.moveDown();
          
        }
        doc.end();
        //wait for the pdf to be created
        await new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).json({ error: "Error downloading the PDF report" });
            }
            fsPromises.unlink(filePath);
        });
    } catch (error) {
        console.error("Error generating PDF report:", error);
        res
            .status(500)
            .json({ error: "An error occurred while generating the PDF report" });
    }
});


app.use((err, req, res, next) => {

    console.error(err);

    if (
        err instanceof multer.MulterError
    ) {
        return res.status(400).json({
            error: err.message
        });
    }

    res.status(500).json({
        error: err.message
    });

});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});