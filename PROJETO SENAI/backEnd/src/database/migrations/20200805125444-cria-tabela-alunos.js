'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable("alunos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      ra: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true
      },

      nome: {
        type: Sequelize.STRING,
        allownull: false

      },

      email: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true

      },

      senha: {
        type: Sequelize.STRING,
        allownull: false

      },

      created_at: {
        type: Sequelize.DATE,
        allownull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allownull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("alunos");
  }
};
