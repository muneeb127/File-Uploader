const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    file:{
        type: Buffer,
        // required: true 
    },
    //Storing user id with each file
    //We can also fetch all info a for a user <<see video>>
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {    
    timestamps: true
})

const File = mongoose.model('File', fileSchema);

module.exports = File; 