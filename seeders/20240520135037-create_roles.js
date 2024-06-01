const bcrypt = require("bcrypt");
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    const hashedPasswordUser = await bcrypt.hash('user123', 10);

    await queryInterface.bulkInsert("Admins", [
      { 
        id: 1, 
        email: 'dhiya@admin.com', 
        name: 'Dhiya Aqila', 
        nim: '2211521010', 
        password: hashedPasswordAdmin, 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 2, 
        email: 'isra@admin.com', 
        name: 'Isra Rahmadina', 
        nim: '2211522030', 
        password: hashedPasswordAdmin, 
        role: 'admin', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 3, 
        email: 'nabila@admin.com', 
        name: 'Nabila R', 
        nim: '2211523036', 
        password: hashedPasswordAdmin, 
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
      password: hashedPasswordUser, 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    },
    { 
      id: 22, 
      email: 'isra@user.com', 
      name: 'Isra Rahmadina', 
      nim: '2211522030', 
      password: hashedPasswordUser, 
      role: 'user', 
      createdAt: new Date(), 
      updatedAt: new Date() 
    },
    { 
      id: 33, 
      email: 'nabila@user.com', 
      name: 'Nabila R', 
      nim: '2211523036', 
      password: hashedPasswordUser, 
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
