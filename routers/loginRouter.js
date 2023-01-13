const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../schema/user");
const session = require("express-session");
const validator = require('validator');

router.get("/", (req, res) => {
  if (!req.session.name) {
    res.render("index", { title: "Sign Up" });
  } else {
    res.redirect("/chat");
  }
});
// when login post
router.post("/", async (req, res) => {
  try {
    let login = async (error, data) => {
      if (data.length != 0) {
        let postedpassword = req.body.password;
        let userpassword = data[0].password;
        bcrypt.compare(postedpassword, userpassword,  async(err, con) => {
          if (con) {
            await users.findByIdAndUpdate(data[0].id, { status: true });

            req.session.name = data[0].username;
            console.log(req.session);
            // res.redirect("/chat");
            res.json({result:"success"})
          } else {
            res.json({err:"Password is wrong "})
            // res.send("Password is wrong ");
          }
        });
      } else {
        // res.send("This Email is not exist");
        res.json({err:"This Email is not exist"})
      }
    };
    if(validator.isEmail(req.body.email))
    {
      users.find({ email: req.body.email }, login);
    }else{
      res.json({err:"This Email is not correct formate"})
    }
  } catch {}
});

module.exports = router;
