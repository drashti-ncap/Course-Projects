const User = require("../models/User");
const Post = require("../models/Post");
const File = require("../models/File");
const Comment = require("../models/Comment");

const fs = require("fs");
const path = require("path");

// get user profile
exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
        });
    }

    const posts = await Post.find({ author: req.user._id }).sort({
        createdAt: -1,
    });

    res.render("profile", {
        title: "Profile",
        user,
        posts,
        error: "",
        postCount: posts.length,
    });
};

// get edit profile form
exports.getEditProfileForm = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    res.render("editProfile", {
        title: "Edit Profile",
        user,
        error: "",
    });
};

// update profile
exports.updateUserProfile = async (req, res) => {
    const { username, email, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (req.file) {

        // delete old local image
        if (user.profilePicture?.url) {
            const oldPath = path.join(
                __dirname,
                "../public",
                user.profilePicture.url.replace(/^\//, "")
            );

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        const file = new File({
            url: `/uploads/${req.file.filename}`,
            public_id: req.file.filename,
            uploaded_by: req.user._id,
        });

        await file.save();

        user.profilePicture = {
            url: file.url,
            public_id: file.public_id,
        };
    }

    await user.save();

    res.redirect("/user/profile")
};

// delete account
exports.deleteUserAccount = async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.redirect("/auth/login");
    }

    // delete profile image
    if (user.profilePicture?.url) {

        const profilePath = path.join(
            __dirname,
            "../public",
            user.profilePicture.url.replace(/^\//, "")
        );

        if (fs.existsSync(profilePath)) {
            fs.unlinkSync(profilePath);
        }
    }

    // delete posts + images + comments
    const posts = await Post.find({ author: user._id });

    for (const post of posts) {

        for (const image of post.images) {

            const imgPath = path.join(
                __dirname,
                "../public",
                image.url.replace(/^\//, "")
            );

            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await Comment.deleteMany({
            _id: { $in: post.comments }
        });

        await Post.findByIdAndDelete(post._id);
    }

    // delete user's comments
    await Comment.deleteMany({
        author: user._id,
    });

    // delete uploaded file records
    await File.deleteMany({
        uploaded_by: user._id,
    });

    // delete user
    await User.findByIdAndDelete(user._id);

    res.redirect("/auth/register");
};