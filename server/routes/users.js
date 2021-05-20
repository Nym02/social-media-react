const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(`Hey it's user route`);
});

module.exports = router;
