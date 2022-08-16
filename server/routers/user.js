const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/user');

//Importing validators
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const router = new express.Router();

// Create user
// Signup 
router.post('/users', async (req, res) => {
    try{
        const user = new User(req.body);

        const {errors, isValid} = validateRegisterInput(req.body);

        //Check user input validation
        if(!isValid){
            return res.status(400).send(errors);
        }

        const token = await user.generateAuthToken();
        res.send({user, token});
    }
    catch(e){
        res.status(400).send(e);
    }
})

// Find user using email and password
// Login
router.post('/users/login', async (req, res)=>{
    try{
        const {errors, isValid} = validateLoginInput(req.body);

        //Check user input validation
        if(!isValid){
            return res.status(401).send(errors);
        }

        // const user = await User.findByCredentials(req.body.email, req.body.password);
        const {user, isValidUser} = await User.findByCredentials(req.body.email, req.body.password);

        if(!isValidUser){
            let errors = {};
            errors.value = "Email or password is invalid"
            return res.status(401).send(errors);
        }

        const token = await user.generateAuthToken();
        res.send({user, token});
    }   
    catch(e){
        res.status(500).send(e);
    }    
})

//Get your own profile
router.get('/users/me', auth, async (req, res)=> {
    try{
        res.send(req.user);
    }
    catch(e){
        res.status(500).send(e);
    }
})

//Logout from single device
router.post('/users/logout', auth, async (req, res)=>{
    try{
        //Update the tokens array
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
            
            // if(token.token == req.token){
            //     return false;
            // }
        });
        
        await req.user.save();
        res.send(req.token);
    }
    catch(e){
        res.status(500).send(e);
    }
})

//Logout from all device
router.post('/users/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    }
    catch(e){
        req.status(500).send();
    }
})


//Update user profile
router.patch('/users/me', auth, async(req, res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        res.status(500).send({error: "Invalid update"});
    }

    try{
        const user = req.user;
        updates.forEach((update)=> user[update] = req.body[update]);

        await user.save();
        res.send(user);
    }
    catch(e){
        res.status(500).send(e);
    }
})


//Delete profile
router.delete('/users/me', auth, async(req, res) => {
   try{
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.status(404).send({error: "User not found"});
        }
        
        res.send(user)
   }
   catch(e){
       res.status(500).send(e);
   }
})

module.exports = router;


