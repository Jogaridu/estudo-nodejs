
// Com o sequelize é permitido mexer com banco de dados SQL no NodeJS
// INSTALAÇÃO: npm install --save sequelize
const Sequelize = require("sequelize");

const nomeBanco = "guiaPerguntas";
const user = "root";
const password = "";
const config = {host: "localhost", dialect: "mysql"};

const conexao = new Sequelize(nomeBanco, user, password, config);

module.exports = conexao;

// Comando abaixo para trabalhar com MySQl no NodeJS
// INSTALAÇÃO: npm install --save mysql2
