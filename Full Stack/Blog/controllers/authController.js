const User = require("../models/User");
const bcrypt = require("bcrypt")


exports.getLogin = (req, res) => {
    res.render("login", {
        title: "Login",
        error: "",
        user: req.user,
    });
}

exports.getRegister = (req, res) => {
    res.render("register", {
        title: "Register",
        user: req.user,
        error: "",
    });
}

//Register logic
exports.register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render("register", {
                title: "Register",
                user: req.user,
                error: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log("User created:", user.email);

        return res.redirect("/auth/login");

    } catch (error) {
        res.render("register", {
            title: "Register",
            user: req.user,
            error: error.message,
        });

    }
};


//Login logic
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.render("login", {
                title: "Login",
                user: null,
                error: "Invalid username or password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.render("login", {
                title: "Login",
                user: null,
                error: "Invalid username or password",
            });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            return res.redirect("/");
        });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
//Logout logic

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err); ''
        }
        res.redirect('/')
    });
}
