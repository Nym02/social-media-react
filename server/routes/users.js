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
    } catch (error) {}
  } else {
    res.status(403).json({
      error: "You can not follow yourself",
    });
  }
});

module.exports = router;
