const Sequelize = require("sequelize");
const connection = require("../database/conexao");

const Category = connection.define("tblCategoria", {
    title: {
        type: Sequelize.STRING,
        allownull: false
    },

    slug: {
        type: Sequelize.STRING,
        allownull: false
    } 
});

module.exports = Category;