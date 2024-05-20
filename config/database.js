<<<<<<< HEAD
const Sequelize = require('sequelize');
=======

// import { Sequelize } from "sequelize";
>>>>>>> 4ee266fdf87e45218954473b5d3c9efb638faa82

const db = new Sequelize('db_datamining','root','',{
    host:"localhost",
    dialect:"mysql"
});

<<<<<<< HEAD
module.exports = db;  
=======
// export default db;


const Sequelize = require('sequelize');
const db = new Sequelize('db_datamining', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;  

>>>>>>> 4ee266fdf87e45218954473b5d3c9efb638faa82
