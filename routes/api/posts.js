const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');


//models
const Post = require('../../models/Post');

//validation
const postValidation = require('../../validation/postValidation');

//api/posts/test
router.get('/test', (req, res) => res.json({
  msg: "posts work"
}));



//@route POST api/posts
//@desc create post
//@access private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const {
    errors,
    isValid
  } = postValidation(req.body);

  //check validation
  if (!isValid) {
    //if errors send 400 with errors
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));

});

module.exports = router;