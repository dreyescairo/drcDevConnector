//USERS API

const express = require("express");

const router = express.Router();

//load user model
const User = require("../../models/User");

//@route GET api/users/test
//@desc Tests users route
//@access public
router.get("/test", (req, res) =>
  res.json({
    msg: "users works"
  })
);

//@route GET api/users/register
//@desc register a user
//@access public
//This will use findone to check if the email from the form exists with a user already. (the user model we brought in)
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    //if user exists with the email
    if (user) {
      return res.status(400).json({
        email: "Email already exists."
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
    }
  });
});

module.exports = router;
