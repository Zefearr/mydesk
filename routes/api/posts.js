const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// validation
const validatePostInput = require('../../validation/post');


//@router   GET api/posts
//@description   get posts
//@access   Public router 
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts)) 
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'})) 
});



//@router   GET api/posts/test
//@description   get posts by id
//@access   Public router 
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))   
        .catch(err => res.status(404).json({nopostfound: 'no posts found with that id'}))
});


//@router   POST api/posts
//@description   Create post
//@access   Private



router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //if any errors, send 400 
        return res.status(400).json(errors); 
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name, 
        avatar: req.body.avatar,  
        user: req.user.id,
        postImg: req.body.postImg
    });
    newPost.save().then(post => res.json(post)); 
})

//@router   GET api/posts/:id
//@description   delete post
//@access   private router 
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check for post owner
                    if(post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' });
                    }
                    //delete
                    post.remove().then(() => res.json({success: true}));
                }).catch(err => res.status(404).json({postnotfound: 'No post found'})) 
        });
});

//@router   POST api/posts/like/:id
//@description   Like post
//@access   private router  
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                  if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({alreadyliked: 'User already liked this post'})
                  } 
                  // add user id to likes array
                  post.likes.unshift({user: req.user.id});
                  post.save().then(post => res.json(post)); 
                }).catch(err => res.status(404).json({postnotfound: 'No post found'})) 
        })
})

 //@router   POST api/posts/unlike/:id
//@description   unlike post
//@access   private router  
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                  if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(400).json({notliked: 'Not liked this post'})
                  } 
                  // get remove index 
                 const removeIndex = post.likes
                  .map(item => item.user.toString())
                  .indexOf(req.user.id);

                  // splice out of array

                  post.likes.splice(removeIndex, 1); 

                  //save

                  post.save().then(post => res.json(post));

                }).catch(err => res.status(404).json({postnotfound: 'No post found'})) 
        });
});

 //@router   POST api/posts/comment/:id
//@description   add comment to post
//@access   private 
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //if any errors, send 400 
        return res.status(400).json(errors); 
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            // add to comments array

            post.comments.unshift(newComment);

            //save

            post.save().then(post => res.json(post)) 
        }).catch(err => res.status(404).json({postnotfound: 'No post Found'}))
})  

//@router   DELETE api/posts/comment/:id/:comment_id
//@description   delete comment from post
//@access   private  
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.id)
        .then(post => {
          //check  if comment exists
          if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({commentnotexists: 'Comment does not exists'});
          }
          // get remove index

          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

            //splice comment out of array

            post.comments.splice(removeIndex, 1); 
            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({postnotfound: 'No post Found'}))
})  
module.exports = router;