const express = require('express');
const multer = require('multer');
const auth = require('../middlewares/auth');
const File = require('../models/file');

const router = express.Router();

const upload = multer({
    // dest: 'files',
    limits : {
        fileSize : 8000000
    },
    fileFilter : function(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|pdf|docx|doc|txt|JPG)$/)){
            cb(new Error('Please upload the correct file type'));
        }

        cb(null, true);
    }
}) 

 
//End point to upload a file
router.post('/upload', auth, upload.array('files'), async (req, res)=> {
    try{
        const files = req.files;
        
        files.forEach(async (file)=>{
            const fileName = Date.now() + '-' + file.originalname;
            const newFile = new File({
                name: fileName,
                file: file.buffer,
                owner: req.user._id
            })

            // console.log(newFile);

            await newFile.save();
        })
        res.send(req.files);
    }
    catch(error){
        res.status(400).send({error: "File can not be uploaded"});
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})


// End point to delete a file
router.delete('/deletefile', auth, async(req, res) => {  
    try{
        // console.log(req.query.id);
        const file = await File.findOneAndDelete({_id: req.query.id});
        // const file = await File.findOneAndDelete({_id: req.query.id, owner: req.user._id});
        // console.log("File: ", file);
        if(!file){
            res.status(400).send();
        }
        res.send(file.id);
    }

    catch(e){
        res.send(e)
    }
})

//Fetch all files for a user
router.get('/files', auth, async(req, res)=>{
    try{
        const files = await File.find({owner: req.user._id})
        if(!files){
            res.status(404).send();
        }
        res.status(200).send(files);
    }
    catch(e){
        res.status(400).send();
    }
})

module.exports = router;

