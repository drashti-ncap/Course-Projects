import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("image");
        const prompt =
            formData.get("prompt") ||
            "Analyze this image and describe important details.";

        // Validation
        if (!file) {
            return Response.json(
                {
                    success: false,
                    error: "Please upload an image",
                },
                { status: 400 }
            );
        }

        if (!file.type.startsWith("image/")) {
            return Response.json(
                {
                    success: false,
                    error: "Only image files are allowed",
                },
                { status: 400 }
            );
        }

        if (file.size > MAX_SIZE) {
            return Response.json(
                {
                    success: false,
                    error: "Image exceeds 10MB limit",
                },
                { status: 400 }
            );
        }

        // Convert image
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");

        const response = await client.responses.create({
            model: "gpt-4.1-mini",

            input: [
                {
                    role: "user",
                    content: [
                        {
                            type: "input_text",
                            text: `
You are an image analysis assistant.

Return:
1. Summary
2. Objects detected
3. Text found
4. Colors/style
5. Important observations

User request:
${prompt}
              `,
                        },
                        {
                            type: "input_image",
                            image_url: `data:${file.type};base64,${base64}`,
                        },
                    ],
                },
            ],
        });

        return Response.json({
            success: true,
            fileName: file.name,
            fileSize: file.size,
            analysis: response.output_text,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                error:
                    error?.message ||
                    "Unexpected error during image analysis",
            },
            {
                status: 500,
            }
        );
    }
}