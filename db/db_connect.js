const mysql = require('mysql');

const APP_SECRET = process.env.APP_SECRET;
const APP_USER= process.env.APP_USER;
const APP_DB_NAME= process.env.APP_DB_NAME;
const APP_HOST_URL= process.env.APP_HOST_URL;

const connection = mysql.createConnection({
    host: APP_HOST_URL,
    user: APP_USER,
    password: APP_SECRET,
    database: APP_DB_NAME,
    multipleStatements: true
});

module.exports = connection; 