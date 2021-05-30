const router = require("express").Router();
const Post = require("../model/postSchema");
//create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savePost = await newPost.save();
    res.status(200).json({
      message: "Post created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error creating your post",
    });
  }
});

//update post

router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Post has been updated.",
      });
    } else {
      res.status(403).json({
        error: "You can only update  your post",
      });
    }
  } catch (err) {
    error: "Post does not exist anymore";
  }
});
//delete post

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({
        message: "Post has been deleted",
      });
    } else {
      res.status(403).json({
        error: "You can only delete your post",
      });
    }
  } catch (err) {
    error: "Post does not exist anymore";
  }
});

//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.inclueds(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({
        message: "Post has been liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({
        message: "Post has been unliked",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Post does not exists anymore",
    });
  }
});
//get a post
// get timeline posts

module.exports = router;
