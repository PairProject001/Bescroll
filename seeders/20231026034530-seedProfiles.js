'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse( fs.readFileSync('./data/Profiles.json', 'utf-8') )

    .map((item) => {
      delete item.id
      item.createdAt = item.updatedAt = new Date();
      return item;
    })

    return queryInterface.bulkInsert('Profiles', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },


  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {truncate: true, cascade: true, restartIdentity: true})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
