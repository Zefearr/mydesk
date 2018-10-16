const validator = require('validator');
const isEmpty = require('./is-empty');  
module.exports = function validatePostInput(data) {   
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

  
   if(!validator.isLength(data.text, {min: 1, max: 30000})) {
       errors.text = 'Post must be atleast 10 characters and maximum is 300 characters'
   }
   
   
    if(validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }
    
 
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}