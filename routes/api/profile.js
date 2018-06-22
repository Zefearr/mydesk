const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../../config/keys');

//load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience'); 
const validateEducationInput = require('../../validation/education');  

//profile model user model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@router   GET api/profile/test
//@description   tests profile router
//@access   Public router 

router.get('/test', (req, res) => {
    res.json({
        msg: 'Profile works'
    })
});

//@router   GET api/profile
//@description  Get current users profile
//@access   Private router 
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there is no profile for this user';
                return res.status(404).json(errors)
            }
            res.json(profile)
        }).catch(err => res.status(404).json(err));
});
//@router   POST api/profile/a;;
//@description Get all profiles
//@access   public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
            if (!profiles) {
                errors.noprofile = 'there is no profile for this user';
                return res.status(404).json();
            }
            res.json(profiles);
        }).catch(err => res.status(404).json({
            profile: 'There is no profiles'
        }));

})

//@router   POST api/profile/handle/:handle
//@description Get profile by handle
//@access   public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'Looks like user is not set his profile';
                res.status(404).json(errors);
            }
            res.json(profile);
        }).catch(err => res.status(404).json(err));

});
//@router   POST api/profile/user/:user_id
//@description Get profile by user_id
//@access   public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'Looks like user is not set his profile';
                res.status(404).json(errors);
            }
            res.json(profile);
        }).catch(err => res.status(404).json({
            profile: 'There is no profile for this user'
        }));

});

//@router   POST api/profile
//@description Create or Edit user profile
//@access   Private router 
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
        // return any errors 400
        return res.status(400).json(errors);
    }
    //Get fields
    const profileFieds = {};
    profileFieds.user = req.user.id;
    if (req.body.handle) {
        profileFieds.handle = req.body.handle;
    }
    if (req.body.company) {
        profileFieds.company = req.body.company;
    }
    if (req.body.website) {
        profileFieds.hanwebsitedle = req.body.website;
    }
    if (req.body.location) {
        profileFieds.location = req.body.location;
    }
    if (req.body.bio) {
        profileFieds.bio = req.body.bio;
    }
    if (req.body.status) {
        profileFieds.status = req.body.status;
    }
    if (req.body.github) {
        profileFieds.github = req.body.github;
    }
    //skills split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFieds.skills = req.body.skills.split(',');
    }
    //social
    profileFieds.social = {};
    if (req.body.youtube) {
        profileFieds.social.youtube = req.body.youtube;
    }
    if (req.body.twitter) {
        profileFieds.social.twitter = req.body.twitter;
    }
    if (req.body.facebook) {
        profileFieds.social.facebook = req.body.facebook;
    }
    if (req.body.instagram) {
        profileFieds.social.instagram = req.body.instagram;
    }
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFieds
                }, {
                    new: true
                }).then(profile => res.json(profile))
            } else {
                //create
                //check if handle exists
                Profile.findOne({
                    handle: profileFieds.handle
                }).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }
                    // Save profile

                    new Profile(profileFieds).save().then(profile => res.json(profile));
                });
            }
        });
});

//@router   POST api/profile/experience
//@description Add experience to profile
//@access   private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //checkvalidation 
    if (!isValid) {
        // return any errors 400
        return res.status(400).json(errors); 
    }
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to, 
            current: req.body.current,
            description: req.body.description
        }
        //add to exp array
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile)); 
    })
});

//@router   POST api/profile/education
//@description Add education to profile
//@access   private

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //checkvalidation 
    if (!isValid) {
        // return any errors 400
        return res.status(400).json(errors); 
    }
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to, 
            current: req.body.current,
            description: req.body.description
        }
        //add to exp array
        profile.education.unshift(newEdu); 
        profile.save().then(profile => res.json(profile)); 
    })
});

//@router   DELETE api/profile/experience/:exp_id
//@description dejete experience from profile
//@access   private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => { 
  
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //get remove index

        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile))
    }).catch(err => res.status(404).json(err)) 
});

//@router   DELETE api/profile/education/:edu_id
//@description dejete education from profile
//@access   private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => { 
  
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        //get remove index

        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);
        //Splice out of array
        profile.education.splice(removeIndex, 1); 

        //save
        profile.save().then(profile => res.json(profile))
    }).catch(err => res.status(404).json(err)) 
});

//@router   DELETE api/profile
//@description dejete user and profile
//@access   private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => { 
  
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({success: true})) 
        })
});

module.exports = router;