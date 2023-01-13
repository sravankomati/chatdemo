const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../schema/user");
const validator = require('validator');

router.get("/register", (req, res) => {
  if (!req.session.name) {
    res.render("register", { title: "register" });
  } else {
    res.redirect("/chat");
  }
});

router.post("/register", async (req, res) => {
  let register = async (error, data) => {
    try {
      if (data.length == 0) {
        let pass = req.body.password;
        let cryptpass = await bcrypt.hash(pass, 10);
        const user = new users({
          username: req.body.username,
          email: req.body.email,
          password: cryptpass,
        });
        user.save().then((result) => {
          // res.redirect("/");
          res.json({result:"success"})
        });
      } else {
        // res.send("This username is already exist");
        res.json({err:"This username is already exist"})
      }
    } catch {
      console.log(error);
    }
  };
  if(validator.isEmail(req.body.email))
  {
    users.find({ username: req.body.username }, register);
  }else{
    res.json({err:"This Email is not correct formate"})
  }
 
});

module.exports = router;
