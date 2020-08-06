const Sequelize = require("sequelize");
const connection = require("../database/conexao");

const User = connection.define("tblUsers", {
    email: {
        type: Sequelize.STRING,
        allownull: false
    },

    senha: {
        type: Sequelize.STRING,
        allownull: false
    } 
});

//User.sync({force: true});

module.exports = User;
