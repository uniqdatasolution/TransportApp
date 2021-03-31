var express = require("express");
var router = express.Router();
var app = express();

var Db = require('./admin.controller');

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

// router.route('/GetUsers').get((req, res) => {
//     Db.getUsers().then(result => {
//         // console.log('res users ', result);
//         res.json(result);
//     })
// })

router.route('/ValidateAdminUser').post((req, res) => {
    // destructuring req.body
    let body = {...req.body};
    Db.ValidateAdminUser(body).then(result => {
        console.log('res users ', result);
        res.json(result);
    })
})

// router.route('/GetUserById/:id').get((req, res) => {
//     Db.GetUserById(req.params.id).then(result => {
//         console.log('res for GetUserById ', result);
//         res.json(result);
//     })
// })

module.exports = router;