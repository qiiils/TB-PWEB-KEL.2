const { Sequelize } =  require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('db_datamining', 'root', '', {
    host: process.env.localhost,
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;


/* const Sequelize = require('sequelize');
const db = new Sequelize('db_datamining', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;  */

