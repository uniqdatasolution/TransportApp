var express = require("express");
var router = express.Router();
var app = express();

var Db = require('./driver.controller');

const multer = require("multer");
const path = require("path");

app.use("/Uploads", express.static(path.join(__dirname, 'Uploads')));

const storage = multer.diskStorage({
    destination: './Uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize:1000000}
})

// router.route('/saveClient').post(upload.single('ProfileImage'),(req, res) => {
//     // destructuring req.body
//     console.log('==req,', req.file);
//     const profileImageUrl = req.protocol + '://' + req.get('host') + '/ProfileImage/' + req.file.filename;
//     let add = {...req.body};
//     add.ProfileImage = profileImageUrl;
//     // console.log('===body', add);
//     Db.saveClient(add).then(result => {
//         console.log('res for saveClient ', result[0]);
//         res.status(200).json(result[0]);
//     })
// })

router.route('/SaveDriver').post((req, res) => {
    // // destructuring req.body
    // console.log('==req,', req.file);
    // const profileImageUrl = req.protocol + '://' + req.get('host') + '/ProfileImage/' + req.file.filename;
    let add = {...req.body};
    // add.ProfileImage = profileImageUrl;
    // // console.log('===body', add);
    Db.saveDriver(add).then(result => {
        console.log('res for saveDriver ', result);
        // res.status(200).json(result[0]);
        res.json(result);
    })
})

router.route('/ValidateDriver').post((req, res) => {
    // destructuring req.body
    let body = {...req.body};
    Db.validateDriver(body).then(result => {
        console.log('res users ', result);
        res.json(result);
    })
})

router.route('/GetAllDrivers').get((req, res) => {
    Db.getAllDrivers().then(result => {
        console.log('res for GetAllDrivers ', result);
        res.json(result);
    })
})

router.route('/GetDriverByDriverId/:id').get((req, res) => {
    Db.getDriverByDriverId(req.params.id).then(result => {
        console.log('res for GetDriverById ', result);
        res.json(result);
    })
})

router.route('/DeleteDriverById/:id').delete((req, res) => {
    console.log('===req', req.params.id)
    Db.deleteDriverById(req.params.id).then(result => {
        console.log('res for DeleteDriverById ', result);
        // res.status(200).json({data: result[0], errorMessage: ""});
        res.json(result);
    })
})

router.route('/ActivateDeactivatDriver').get((req, res) => {
    console.log('===req', req.query)
    Db.ActivateDeactivateDriver(req.query).then(result => {
        console.log('res for ActivateDeactivateDriver ', result);
        // res.status(200).json({data: result[0], errorMessage: ""});
        res.json(result);
    })
})

module.exports = router;