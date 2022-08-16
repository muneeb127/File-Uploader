const express = require('express');
const multer = require('multer');
const File = require('../models/file');

const router = express.Router();



const upload = multer({
    dest: 'files',
    limits : {
        fileSize : 8000000
    },
    fileFilter : function(req, file, cb){
        //if(!file.originalname.match(/\.(png|jpg|jpeg|pdf|docx|doc)$/)){
        if(!file.originalname.match(/\.(doc)$/)){
            cb(new Error('Please upload the correct file type'));
        }

        cb(null, true);
    }
}) 

/* 
@Upload File
@POST
*/

router.post('/upload', upload.single('file'), (req, res)=> {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})


module.exports = router;

