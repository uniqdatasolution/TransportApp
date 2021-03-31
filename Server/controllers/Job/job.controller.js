var config = require('./../../dbConfig');
const sql = require('mssql');

var jwt = require('jsonwebtoken');
var jwtSecret = require('./../../config.json');

async function saveJob(form) {
    try {
        // enctype="multipart/form-data"
        let pool = await sql.connect(config);
        let saveJob = await pool.request()
            .input('JobId', sql.Int, form.JobId)
            .input('Title', sql.VarChar, form.Title)
            .input('Description', sql.VarChar, form.Description)
            .input('JobType', sql.VarChar, form.JobType)
            .input('StartTime', sql.DateTime, form.StartTime)
            .input('EndTime', sql.DateTime, form.EndTime)
            .input('JobStatus', sql.VarChar, form.JobStatus)
            .input('IsActive', sql.Bit, form.IsActive)
            .input('CreatedBy', sql.Int, form.CreatedBy)
            .input('ModifiedBy', sql.Int, form.ModifiedBy)
            .input('FromContactName', sql.VarChar, form.FromContactName)
            .input('FromContactNumber', sql.VarChar, form.FromContactNumber)
            .input('FromAddress', sql.VarChar, form.FromAddress)
            .input('ToContactName', sql.VarChar, form.ToContactName)
            .input('ToContactNumber', sql.VarChar, form.ToContactNumber)
            .input('ToAddress', sql.VarChar, form.ToAddress)
            .input('DriverId', sql.Int, form.DriverId)
            .execute('SaveJob');
        return {status: true, data: saveJob.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log(error);
        return {status: false, data: "", errorMessage: error};
    }
}

async function getAllJobs() {
    try {
        let pool = await sql.connect(config);
        // let clients = await pool.request().query("select * from ClientMaster");
        let jobs = await pool.request().execute('GetAllJobs')
        return {status: true, data: jobs.recordsets[0], errorMessage: ""};
    } catch (error) {
        // console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error.originalError.info.message}
    }
}

async function getJobByJobId(id) {
    try {
        let pool = await sql.connect(config);
        let job = await pool.request()
                    .input('JobId', sql.Int, id)
                    .execute('GetJobByJobId');
        return await {status: true, data: job.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

async function deleteJobByJobId(id) {
    try {
        let pool = await sql.connect(config);
        let job = await pool.request()
                    .input('JobId', sql.Int, id)
                    .execute('DeleteJobByJobId');
        return await {status: true, data: job.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

async function ActivateDeactivateJob(form) {
    try {
        // console.log('====================== form.IsActive',  form.IsActive)
        let pool = await sql.connect(config);
        // console.log('====================== form.IsActive',  form.IsActive)
        let job = await pool.request()
                    .input('JobId', sql.Int, form.JobId)
                    .input('IsActive', sql.VarChar, form.IsActive)
                    .execute('ActivateDeactivateJob');
                    // console.log('========================ac', job)
        return await {status: true, data: job.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

module.exports = {
    saveJob: saveJob,
    getAllJobs: getAllJobs,
    getJobByJobId: getJobByJobId,
    deleteJobByJobId: deleteJobByJobId,
    ActivateDeactivateJob: ActivateDeactivateJob,
}