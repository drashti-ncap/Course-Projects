const express = require("express");
const postRoutes = express.Router();
const { getPostform, createPost, getPosts, getPostById, getEditPostForm, updatePost, deletePost } = require("../controllers/postcontroller");
const { ensureAuthenticated } = require("../middlewares/auth");

const upload = require("../config/multer");

postRoutes.get("/add", getPostform);

// Add detailed error handling
postRoutes.post(
  "/add",
  ensureAuthenticated,

  upload.array("images", 5),
  createPost
);

postRoutes.get("/", getPosts);

postRoutes.get("/:id", getPostById);

postRoutes.get("/:id/edit", getEditPostForm);
postRoutes.put(
  "/:id",
  ensureAuthenticated,
  upload.array("images", 5),
  updatePost
);

postRoutes.delete("/:id", ensureAuthenticated, deletePost);


module.exports = postRoutes;