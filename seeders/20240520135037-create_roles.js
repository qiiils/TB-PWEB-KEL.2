const bcrypt = require("bcrypt");
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Admins", [
      { 
        id: 1, 
        email: 'dhiya@admin.com', 
        name: 'Dhiya Aqila', 
        nim: '2211521010', 
        password: 'aqila123', 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2, 
        email: 'isra@admin.com', 
        name: 'Isra Rahmadina', 
        nim: '2211522030', 
        password: 'ina123', 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 3, 
        email: 'nabila@admin.com', 
        name: 'Nabila R', 
        nim: '2211523036', 
        password: 'nabila123', 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ], 
    {}
  );



  await queryInterface.bulkInsert("users", [
    { 
      id: 11, 
      email: 'dhiya@user.com', 
      name: 'Dhiya Aqila', 
      nim: '2211521010', 
      password: 'aqila456', 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    },
    { 
      id: 22, 
      email: 'isra@user.com', 
      name: 'Isra Rahmadina', 
      nim: '2211522030', 
      password: 'ina456', 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    },
    { 
      id: 33, 
      email: 'nabila@user.com', 
      name: 'Nabila R', 
      nim: '2211523036', 
      password: 'nabila456', 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    },
  ], 
  {}
);

},

  down: async (queryInterface, Sequelize) => {
    // Rollback data insertion here if needed
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
