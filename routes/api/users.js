const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@router   GET api/users/test
//@description   tests users router
//@access   Public router 

router.get('/test', (req, res) => {
    res.json({
        msg: 'Users works'
    })
});

//@router   POST api/users/register 
//@description   register user
//@access   Public 
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors)
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '100', //size of avatar
                r: 'pg', //rating
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
});

//@route get api/users/login
//@description login user / returning jwt token
//@access public

router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //find user
    User.findOne({
        email: email
    }).then(user => {
        //check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors)
        }
        // check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //user matched

                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    } //create JWT payload

                    //sign token
                    jwt.sign(payload, keys.Key, {
                        expiresIn: 18000 
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                } else {
                    errors.password = 'Password incorrect'
                    return res.status(400).json(errors); 
                }
            });
    });
});

//@route get api/users/current
//@description return current user
//@access private

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;