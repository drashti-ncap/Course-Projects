require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes")
const passport = require("passport");
const MongoStore = require("connect-mongo").default;
const passportConfig = require("./config/passport");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const methodOverride = require("method-override");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
        }),
    })
);

passportConfig(passport);
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
        error: "",
        title: "Home",
    })
})

app.use("/auth", authRoutes)
app.use("/posts", postRoutes)
app.use("/", commentRoutes)
app.use("/user", userRoutes);



mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully")
        app.listen(PORT, () => {
            console.log("Server is running on the port")
        })
    })
    .catch((err) => {
        console.log(err.message)
    })


