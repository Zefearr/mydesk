const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.slug = !isEmpty(data.slug) ? data.slug : ''; 
    data.status = !isEmpty(data.status) ? data.status : ''; 
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!validator.isLength(data.slug, { min: 2, max: 40 })) {
        errors.slug = 'Handle needs to be between 2 and 4 characters'; 
    }
    if(validator.isEmpty(data.slug)) {
        errors.slug = 'Profile handle is required';  
    }

    if(validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if(validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if(!isEmpty(data.youtube)) {
        if(!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid url';
        }
    }
    if(!isEmpty(data.facebook)) {
        if(!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
   
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}