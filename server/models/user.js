const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
    },
    password:{
        type: String,
        trim: true,
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
});

// Generating Auth token
userSchema.methods.generateAuthToken = async function (){
    const user = this;
    
    //create JWT payload
    const payload = {
        id: user._id.toString(),
        name: user.name,
        email:user.email
    }

    // const token = jwt.sign({_id: user._id.toString()}, 'yourheadisahouseboat');
    const token = jwt.sign(payload, 'yourheadisahouseboat', {expiresIn: 3600});
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;

}

// Method to find users by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    
    const user = await User.findOne({email});

    if (!user){
        // throw new Error("Login Failed");
        return {
            user: '',
            isValidUser: false
        }
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        // throw new Error("Login Failed");
        return {
            user: '',
            isValidUser: false
        }
    }

    return {
        user,
        isValidUser: true
    };
}

// Limits the data being send to client
userSchema.methods.toJSON = function(){
    const user= this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// mongoose middleware which run right before saving the user in DB
// checks if password is available, then hashes it
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;