const express = require("express");
const User = require("../models/User");
const authRoutes = express.Router();
const { getLogin,
    getRegister,
    login,
    register,
    logout } = require("../controllers/authController");



authRoutes.get("/login", getLogin);
authRoutes.get("/register", getRegister);
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);


module.exports = authRoutes;