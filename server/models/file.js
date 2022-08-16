const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    // name : {
    //     type: String,
    //     trim: true
    // }
    file: {
        type: Buffer,
        required: true 
    }
    // owner: {

    // }
}, {
    timestamps: true
})

const File = mongoose.model('File', fileSchema);

module.exports = File; 