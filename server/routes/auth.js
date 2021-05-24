const router = require("express").Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json({
      message: "User Added Succesfully",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
