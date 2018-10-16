const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProfileShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    slug: {  
        type: String,
        required: true,
        max: 40
    },
    ava: { 
        type: String 
    }, 
    status: {
        type: String,
        required: true 
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String 
    },

    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type:Boolean,
            default: false
        },
        description: { 
            type: String,
        },

    }],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    } 

});

module.exports = Profile = mongoose.model('profile', ProfileShema); 