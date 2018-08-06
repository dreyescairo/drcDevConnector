const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

//models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//validation
const postValidation = require("../../validation/postValidation");

//api/posts/test
router.get("/test", (req, res) =>
  res.json({
    msg: "posts work"
  })
);

//@route POST api/posts
//@desc create post
//@access private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);

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
  }
);

//@route DELETE api/posts/:id
//@desc delete the post
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notAuthorized: "User not authorized"
            });
          } else {
            post
              .remove()
              .then(() =>
                res.json({
                  success: true
                })
              )
              .catch(err =>
                res.status(404).json({
                  postNotFound: "The post you are looking for is not found!"
                })
              );
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ error: "The post ID you are requesting is not found." })
        );
    });
  }
);

//@route GET api/posts
//@desc get all posts
//@access public
router.get("/", (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        errorFindingPosts: "No posts found"
      })
    );
});

//@route GET api/posts/:id
//@desc get posts by id
//@access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({
        errorFindingPostByID: "There was a problem finding the post!"
      })
    );
});

//@route POST api/posts/like/:post_id
//@desc like a post
//@access private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            //could probably have the logic to undo the like right here instead of a separate route.
            return res
              .status(400)
              .json({ alreadyLiked: "User has already liked this post" });
          }

          //add user id to likes array. use unshift() to put it in the beginning of the array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ error: "The post ID you are requesting is not found." })
        );
    });
  }
);

//@route POST api/posts/unlike/:post_id
//@desc unlike a post
//@access private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not liked this post yet" });
          }

          //get the remove index
          const indexToRemove = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice out of array
          post.likes.splice(indexToRemove, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ error: "The post ID you are requesting is not found." })
        );
    });
  }
);

//@route POST api/posts/comment/:post_id
//@desc Add comment to post
//@access private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);

    //check if form is valid or not
    if (!isValid) {
      //if errors send 400 with errors
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id).then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      //add comment to posts comments array
      post.comments.unshift(newComment);

      //save
      post
        .save()
        .then(post => res.json(post))
        .catch(err =>
          res.status(404).json({ noPostFound: "No post was found." })
        );
    });
  }
);

//@route DELETE api/posts/comment/:post_id/:comment_id
//@desc delete comment on post
//@access private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      //check to see if the comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentDoesNotExist: "Comment does not exist!" });
      }

      //get the index of the comment to remove by mapping the collections comment id to the indexOf comment_id that it matches to.
      const commentToRemove = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      //splice out of array
      post.comments.splice(commentToRemove, 1);

      post.save().then(post => res.json(post));
    });
  }
);

module.exports = router;
