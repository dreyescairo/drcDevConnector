const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');

//load profile model
const profile = require('../../models/Profile');

const user = require('../../models/User');

//api/profile/test
router.get('/test', (req, res) => res.json({
  msg: "profile works"
}));


//@route GET api/profile
//@desc Get current users profile
//@access private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const errors = {};

  profile.findOne({
    user: req.user.id
  }).then(profile => {
    if (!profile) {
      errors.noProfile = 'There is no profile for this user.';
      return res.status(404).json;
    }

    res.json(profile);
  }).catch(err => res.status(404).json);

});

module.exports = router;