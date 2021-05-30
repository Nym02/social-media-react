const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hey it's user route`);
});

//update user

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json({
          error: "There was an error updating you password",
        });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        message: "Account has been updated",
      });
    } catch (error) {
      res.status(400).json({
        error: "There was an error while updating your profile",
      });
    }
  } else {
    res.status(403).json({
      error: "You only can update your profile",
    });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Account has been deleted",
      });
    } catch (error) {
      res.status(400).json({
        error: "There was an error while deleting your account",
      });
    }
  } else {
    res.status(403).json({
      error: "You only can delete your profile",
    });
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.body.userId } });
        res.status(200).json({
          message: "User has been followed",
        });
      } else {
        res.status(403).json({
          error: "You already following this person",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "There was an error",
      });
    }
  } else {
    res.status(403).json({
      error: "You can not follow yourself",
    });
  }
});
//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.body.userId } });
        res.status(200).json({
          message: "User has been unfollowed",
        });
      } else {
        res.status(403).json({
          error: "You do not follow this person",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "There was an error",
      });
    }
  } else {
    res.status(403).json({
      error: "You can not unfollow yourself",
    });
  }
});

module.exports = router;
