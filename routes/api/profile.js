const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

//load validation script
const validateProfileInput = require("../../validation/profile");

//load profile model
const Profile = require("../../models/Profile");

const User = require("../../models/User");

//@route GET api/profile
//@desc Get current users profile
//@access private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
      })
      .populate()
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile
//@desc Create or edit user profile
//@access private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get profile fields. We get our user because we are passing in a JWT with all the uder information.
    //get field data
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubUsername) {
      profileFields.githubUsername = req.body.githubUsername;
    }
    //skills split ',' to array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social objects
    profileFields.social = {};
    if (req.body.youtube) {
      //social will contain many social sites like youtube, instagram, etc.
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
      //social will contain many social sites like twitter, instagram, etc.
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
      //social will contain many social sites like facebook, instagram, etc.
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.linkedin) {
      //social will contain many social sites like linkedin, instagram, etc.
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.instagram) {
      //social will contain many social sites like instagram, instagram, etc.
      profileFields.social.instagram = req.body.instagram;
    }

    //imported model is uppercase!!! the profile var in .then(profile =>) is lowercase because it is a different variable
    //what was happening is I imported 'profile' as lowercase, so when it hit .then(), it overwrote my model with the return value of the promise.
    // I didn't want my model to change based on that, so I changed it to uppercase and the .then() variable to lowercase.
    //This allowed me to keep the instance I had for Model, and have the return data in a lowercase profile model so I can manipulate it without
    //overwriting my imported Profile model. Make sense? I hope so because this took me forever to pin point...
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (profile) {
          //update the profile
          Profile
            .findOneAndUpdate({
              user: req.user.id
            }, {
              $set: profileFields
            }, {
              new: true
            })
            .then(profile => res.json(profile))
            .catch(err => console.log(err)); //Give the profile once we update.
        } else {
          //create the profile

          //Check if handle exists
          Profile.findOne({
              handle: profileFields.handle
            })
            .then(profile => {
              if (profile) {
                errors.handle = "That handle already exists!";
                res.status(400).json(errors);
              }
              //save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;