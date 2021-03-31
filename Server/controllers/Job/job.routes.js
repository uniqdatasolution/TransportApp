var express = require("express");
var router = express.Router();
var app = express();

var Db = require('./job.controller');

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

router.route('/SaveJob').post((req, res) => {
    // // destructuring req.body
    let add = {...req.body};
    Db.saveJob(add).then(result => {
        console.log('res for saveJob ', result);
        // res.status(200).json(result[0]);
        res.json(result);
    })
})

router.route('/GetAllJobs').get((req, res) => {
    Db.getAllJobs().then(result => {
        console.log('res for getAllJobs ', result);
        res.json(result);
    })
})

router.route('/GetJobByJobId/:id').get((req, res) => {
    Db.getJobByJobId(req.params.id).then(result => {
        console.log('res for getJobByJobId ', result);
        res.json(result);
    })
})

router.route('/DeleteJobById/:id').delete((req, res) => {
    console.log('===req', req.params.id)
    Db.deleteJobByJobId(req.params.id).then(result => {
        console.log('res for deleteJobByJobId ', result);
        // res.status(200).json({data: result[0], errorMessage: ""});
        res.json(result);
    })
})

router.route('/ActivateDeactivateJob').get((req, res) => {
    console.log('===req', req.query)
    Db.ActivateDeactivateJob(req.query).then(result => {
        console.log('res for ActivateDeactivateJob ', result);
        // res.status(200).json({data: result[0], errorMessage: ""});
        res.json(result);
    })
})



module.exports = router;