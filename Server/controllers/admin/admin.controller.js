var config = require('./../../dbConfig');
const sql = require('mssql');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var jwtSecret = require('./../../config.json');

// async function getUsers() {
//     try {
//         let pool = await sql.connect(config);
//         // let clients = await pool.request().query("select * from ClientMaster");
//         let users = await pool.request().execute('GetAllUsers')
//         return {status: true, data: users.recordsets[0], errorMessage: ""};
//     } catch (error) {
//         // console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
//         return {status: false,errorMessage: error.originalError.info.message}
//     }
// }

async function ValidateAdminUser(form) {
    try {
        let pool = await sql.connect(config);
        const payload = { user: form.MobileNumber };
        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
        const secret = jwtSecret.secret;
        const token = jwt.sign(payload, secret, options);
        let validateUser = await pool.request()
            .input('MobileNumber', sql.VarChar, form.MobileNumber)
            .input('Password', sql.VarChar, form.Password)
            .execute('ValidateAdminUser')
        return await {status: true, data: validateUser.recordsets[0], errorMessage: "", token: token};
    } catch (error) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
        // return {status: false,errorMessage: error.originalError.info.message}
        return {status: false,errorMessage: error}
    }
}

// async function GetUserById(id) {
//     try {
//         let pool = await sql.connect(config);
//         let user = await pool.request()
//                     .input('UserId', sql.Int, id)
//                     .execute('GetUserById');
//         return await {status: true, data: user.recordsets[0], errorMessage: ""};
//     } catch (error) {
//         console.log('errrrrrrrrrrrrrrrrrrrrrrrr', error);
//         return {status: false,errorMessage: error}
//     }
// }

module.exports = {
    // getUsers: getUsers,
    ValidateAdminUser: ValidateAdminUser,
    // GetUserById: GetUserById,
}