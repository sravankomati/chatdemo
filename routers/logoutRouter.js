const express = require("express");
const users = require("../schema/user");
const router = express.Router();

router.get("/logout", async (req, res) => {
  if (req.session.name) {
    await users.findOneAndUpdate({ username: req.session.name }, { status: false });
    delete req.session.name;
    res.redirect("/");
    console.log("logout");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
