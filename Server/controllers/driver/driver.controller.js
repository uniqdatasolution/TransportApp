var config = require('./../../dbConfig');
const sql = require('mssql');

var jwt = require('jsonwebtoken');
var jwtSecret = require('./../../config.json');

async function saveDriver(form) {
    try {
        // enctype="multipart/form-data"
        let pool = await sql.connect(config);
        let saveDriver = await pool.request()
            .input('DriverId', sql.Int, form.DriverId)
            .input('FirstName', sql.VarChar, form.FirstName)
            .input('LastName', sql.VarChar, form.LastName)
            .input('Email', sql.VarChar, form.Email)
            .input('MobileNumber', sql.VarChar, form.MobileNumber)
            .input('Password', sql.VarChar, form.Password)
            .input('VehicleName', sql.VarChar, form.VehicleName)
            .input('VehicleNumber', sql.VarChar, form.VehicleNumber)
            .input('IsActive', sql.Bit, form.IsActive)
            .input('CreatedBy', sql.Int, form.CreatedBy)
            .input('ModifiedBy', sql.Int, form.ModifiedBy)
            .input('DeviceId', sql.Int, form.DeviceId)
            .input('DeviceType', sql.VarChar, form.DeviceType)
            .input('DeviceName', sql.VarChar, form.DeviceName)
            .execute('SaveDriver');
        return {status: true, data: saveDriver.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log(error);
        return {status: false, errorMessage: error};
    }
}

async function validateDriver(form) {
    try {
        let pool = await sql.connect(config);
        const payload = { user: form.MobileNumber };
        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
        const secret = jwtSecret.secret;
        const token = jwt.sign(payload, secret, options);
        let validateUser = await pool.request()
            .input('MobileNumber', sql.VarChar, form.MobileNumber)
            .input('Password', sql.VarChar, form.Password)
            .execute('ValidateDriver')
        return await {status: true, data: validateUser.recordsets[0], errorMessage: "", token: token};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        // return {status: false,errorMessage: error.originalError.info.message}
        return {status: false,errorMessage: error}
    }
}

async function getAllDrivers() {
    try {
        let pool = await sql.connect(config);
        // let clients = await pool.request().query("select * from ClientMaster");
        let drivers = await pool.request().execute('GetDriversList')
        return {status: true, data: drivers.recordsets[0], errorMessage: ""};
    } catch (error) {
        // console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error.originalError.info.message}
    }
}

async function getDriverByDriverId(id) {
    try {
        let pool = await sql.connect(config);
        let driver = await pool.request()
                    .input('DriverId', sql.Int, id)
                    .execute('GetDriverById');
        return await {status: true, data: driver.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

async function deleteDriverById(id) {
    try {
        let pool = await sql.connect(config);
        let driver = await pool.request()
                    .input('DriverId', sql.Int, id)
                    .execute('DeleteDriverById');
        return await {status: true, data: driver.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

async function ActivateDeactivateDriver(form) {
    try {
        // console.log('====================== form.IsActive',  form.IsActive)
        let pool = await sql.connect(config);
        // console.log('====================== form.IsActive',  form.IsActive)
        let driver = await pool.request()
                    .input('IsActive', sql.VarChar, form.IsActive)
                    .input('DriverId', sql.Int, form.DriverId)
                    .execute('ActivateDeactivateDriver');
                    // console.log('========================ac', driver)
        return await {status: true, data: driver.recordsets[0], errorMessage: ""};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        return {status: false,errorMessage: error}
    }
}

module.exports = {
    saveDriver: saveDriver,
    validateDriver: validateDriver,
    getAllDrivers: getAllDrivers,
    getDriverByDriverId: getDriverByDriverId,
    deleteDriverById: deleteDriverById,
    ActivateDeactivateDriver: ActivateDeactivateDriver
}