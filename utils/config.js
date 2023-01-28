require('dotenv').config();

const config = {
  db_host: process.env.MYSQL_HOST,
  db_port: process.env.MYSQL_PORT,
  db_user: process.env.MYSQL_USER,
  db_password: process.env.MYSQL_PASSWORD,
  db_name: process.env.MYSQL_DBNAME,
};

module.exports = config;
