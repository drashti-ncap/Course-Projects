const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");
exports.getPostform = (req, res) => {
    res.render("newPost", {
        title: "Create Post",
        success: "",
        error: "",
        user: req.user
    });
};

exports.createPost = async (req, res) => {
    try {

        const { title, content } = req.body;

        // validation
        if (!req.files || req.files.length === 0) {
            return res.render("newPost", {
                title: "Create Post",
                user: req.user,
                error: "At least one image is required",
                success: ""
            });
        }

        // convert uploaded files to DB format
        const images = req.files.map(file => ({
            url: `/uploads/${file.filename}`,
            public_id: file.filename
        }));

        // create post
        const newPost = new Post({
            title,
            content,
            author: req.user._id,
            images
        });

        await newPost.save();

        return res.render("newPost", {
            title: "Create Post",
            user: req.user,
            success: "Post created successfully",
            error: ""
        });

    } catch (err) {
        console.log(err);

        return res.status(500).render("newPost", {
            title: "Create Post",
            user: req.user,
            error: "Something went wrong",
            success: ""
        });
    }
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate("author", "username");

    res.render("posts", {
        title: "Posts",
        posts,
        user: req.user,
        success: "",
        error: "",
    });
};


exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate("author", "username")
        .populate({
            path: "comments",
            populate: {
                path: "author",
                model: "User",
                select: "username",
            },
        });
    console.log(post);
    res.render("postDetails", {
        title: "Post",
        post,
        user: req.user,
        success: "",
        error: "",
    });
};

exports.getEditPostForm = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.render("postDetails", {
            title: "Post",
            post,
            user: req.user,
            error: "Post not found",
            success: "",
        });
    }
    res.render("editPost", {
        title: "Edit Post",
        post,
        user: req.user,
        error: "",
        success: "",
    });
};



exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    post.title = title;
    post.content = content;

    if (req.files && req.files.length > 0) {

      for (const img of post.images) {
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          img.url.replace(/^\//, "")
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      post.images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        public_id: file.filename
      }));
    }

    await post.save();

    res.redirect(`/posts/${post._id}`);

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};



exports.deletePost = async (req, res) => {
  //find the post
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (post.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "You are not authorized to delete this post",
      success: "",
    });
  }
  await Promise.all(
    post.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    })
  );
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
};
