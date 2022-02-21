const mysql = require('mysql');

const dbInfo = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
};

let connection= mysql.createPool(dbInfo);

module.exports = connection;