const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const decoded = jwt.verify(token, 'yourheadisahouseboat');
        const user = await User.findOne({_id : decoded.id, 'tokens.token': token});
        console.log("User: ", user.name);

        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(e){
        res.status(500).send({error: 'Please authenticate!'});
    }
}

module.exports = auth;