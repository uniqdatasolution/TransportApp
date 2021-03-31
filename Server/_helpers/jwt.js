const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            // /^\/api\/GetStateByCountryId\/.*/,
            // /^\/api\/GetCityByStateId\/.*/,
            // '/api/Client/sendotp',
            '/api/AdminUser/ValidateAdminUser',
            '/api/Driver/ValidateDriver',
            '/api/Driver/SaveDriver',
            
            // /^\/(ProfileImage|log)\/.+$/
        ]
    });
}