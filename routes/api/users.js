//USERS API

const express = require("express");

const router = express.Router();

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const passport = require("passport");

//load input validation
const validateRegistrationInput = require("../../validation/register");

//Load login input validation
const validateLoginInput = require("../../validation/login");

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

//@route POST api/users/register
//@desc register a user
//@access public
//This will use findone to check if the email from the form exists with a user already. (the user model we brought in)
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  //check validation 1st step
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    //if user exists with the email
    if (user) {
      //errors is from the const declared above
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      //gets the url for a default avatar or their gravatar avatar if they have one.
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      //callback function throws an error or gives us the salt.
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        //hash the password and pass in the salt. callback func to see if error or good hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            //then respond with the user object
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@desc login a user / Returning JWT
//@access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation 1st step
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({
    email: email
  }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }

    //check password with bcrypt because the password in DB is encrypted
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched include what you want in the payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };

        //assign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password is incorrect!";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/current
//@desc Return Current User
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    //I got a user back from authenticationg in passport.js, from that user respond the properties that I want in json format.
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
  }
);

module.exports = router;
