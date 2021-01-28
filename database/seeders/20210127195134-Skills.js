'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => queryInterface.bulkInsert('Skills', [
        { name: 'HTML' },
        { name: 'Java' },
        { name: 'vueJs' },
        { name: 'PHP' },
        { name: 'Laravel' },
        { name: 'C#' },
        { name: 'SpringBoot' }
    ], {}),
    down: async(queryInterface, Sequelize) => queryInterface.bulkDelete('Skills', null, {})

};