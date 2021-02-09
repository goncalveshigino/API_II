'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Jobs', 'SelectedApplicationId', {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Applications',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Jobs', 'SelectedApplicationId', {})
    }
};