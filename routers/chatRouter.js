const express = require("express");
const router = express.Router();
const session = require("express-session");

router.get("/chat", (req, res) => {
  if (req.session.name) {
    res.render("whatschat", { name: req.session.name });
  } else {
    res.redirect("/");
  }
});
router.get("/chat1", (req, res) => {
  if (req.session.name) {
    res.render("msg1", { name: req.session.name });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
