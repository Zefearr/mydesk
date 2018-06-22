const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: keys.Key  
};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretKey = keys.Key;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {  
       User.findById(jwt_payload.id)
       .then(user => {
           if(user) {
               return done(null, user);
           }
           return done(null, false)
       }).catch(err => console.log(err)); 
    }));
};