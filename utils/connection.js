const mysql = require('mysql2');
const config = require('./config');

const pool = mysql
  .createPool({
    connectionLimit: 5,
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
  })
  .promise();

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;
