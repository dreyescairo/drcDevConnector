const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');


//models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

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

//@route DELETE api/posts/:id
//@desc delete the post
//@access private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {


  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      //check for post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          notAuthorized: "User not authorized"
        });
      } else {
        post.remove().then(() => res.json({
          success: true
        })).catch(err => res.status(404).json({
          postNotFound: "The post you are looking for is not found!"
        }));
      }
    });
  });


});

//@route GET api/posts
//@desc get posts
//@access public
router.get('/', (req, res) => {
  Post.find().sort({
    date: -1
  }).then(posts => res.json(posts)).catch(err => res.status(404).json({
    errorFindingPosts: "No posts found"
  }));
});

//@route GET api/posts/:id
//@desc get posts by id
//@access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.status(404).json({
    errorFindingPostByID: "There was a problem finding the post!"
  }));
});


module.exports = router;