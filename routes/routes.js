const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../models/image');

// Multer File upload settings
const DIR = './public/'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Multer Mime Type validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png .jpg .jpeg format allowed!'));
        }
    }
});

router.get('/zama', (req, res) => {
    res.send('Testing 123');
})

router.post('/create', upload.single('img'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const image = new Image({
        name: req.body.name,
        desc: req.body.desc,
        img: url + '/public/' + req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        date: req.file.dateCreated
    });
    image.save().then(result => {
        res.status(201).json({
            message: 'File added successfully!',
            fileCreated: {
                name: result.name,
                desc: result.desc,
                img: result.img,
                size: result.size,
                mimetype: result.mimetype,
                dateCreated: result.dateCreated
            }
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        });
    })
});

router.get('/', async (req, res, next) => {
    try {
        const list = await Image.find();
        // console.log();
        res.json(list);
    } catch (error) {
        res.json(console.log('failed to load list'), {message: error});
    }
});

router.get('/:id', (req, res, next) => {
    Image.findById(req.params.id).then(data => {
        if (data) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'File not found!'
            });
        }
    });
});

module.exports = router;