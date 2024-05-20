
// import { Sequelize } from "sequelize";

// const db = new Sequelize('db_datamining', 'root', '', {
//     host: "localhost",
//     dialect: "mysql",
// });

// export default db;


const Sequelize = require('sequelize');
const db = new Sequelize('db_datamining', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;  

