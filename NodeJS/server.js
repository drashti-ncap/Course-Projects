const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Server");
});

let books = [
    {
        id: 1,
        title: "React.js",
        description: "It is building block of the UI"
    },
    {
        id: 2,
        title: "Node.js",
        description: "Server Runtime Envrionment"
    },
    {
        id: 3,
        title: "JavaScript",
        description: "funtionality to html elements"
    },


]

app.get("/books", (req, res) => {
    res.json(books);
})

app.post("/books", (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.json({ message: "New Book Added!" })
})

app.get("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    const bookFound = books.find((book) => {
        return book.id === bookId
    })
    if (!bookFound) {
        res.json({ message: "Book Not Found" })
    }
    res.json(bookFound)


})


app.delete("/books/:id", (req, res) => {
    books = books.filter((book) => {
        const bookId = Number(req.params.id);
        return book.id !== bookId;

    })
    res.json({ message: "Book deleted successfully" })

})

app.put("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(
        (book) => book.id === bookId
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, description } = req.body;

    if (title) {
        book.title = title;
    }

    if (description) {
        book.description = description;
    }

    res.json({
        message: "Book updated successfully",
    });
});


app.listen(3000, () => {
    console.log("Server is running on PORT ");
})