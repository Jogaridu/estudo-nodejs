'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("postagens", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      titulo: {
        type: Sequelize.STRING,
        allownull: false,
      },

      descricao: {
        type: Sequelize.TEXT,
        allownull: false,
      },

      imagem: {
        type: Sequelize.STRING,
        allownull: true,
      },

      gists: {
        type: Sequelize.TEXT,
        allownull: true,
      },

      created_aluno_id: {
        type: Sequelize.INTEGER,
        allownull: false,
        references: {
          model: "alunos",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      created_at: {
        type: Sequelize.DATE,
        allownull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allownull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("postagens");
  }
};
