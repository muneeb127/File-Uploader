const validator = require('validator');
const isEmpty = require('./isEmpty')

const validateRegisterInput = (data) => {
    let errors =  {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!validator.isLength(data.name, {min:3 , max: 30})){
        errors.name = "Name must be between 3 and 30 characters";
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Enter a valid email address";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!validator.isLength(data.password, {min:6, max:40})) {
        errors.password = 'Password must be at least 6 characters';
    }

    if(data.password.toLowerCase().includes('password')){
        errors.password = "Password cannot contain the word 'password'";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateRegisterInput;