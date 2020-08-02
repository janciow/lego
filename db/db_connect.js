const mysql = require('mysql');

const MY_APP_SECRET = process.env.APP_SECRET;
const MY_APP_USER= process.env.APP_USER;
const MY_APP_DB_NAME= process.env.APP_DB_NAME;

const connection = mysql.createConnection({
    host: 'localhost',
    user: MY_APP_USER,
    password: MY_APP_SECRET,
    database: MY_APP_DB_NAME
});

module.exports = connection; 