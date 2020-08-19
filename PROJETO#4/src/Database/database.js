const Sequelize = require("sequelize");

const nomeBanco = "dbApiGames";
const user = "root";
const password = "";
const config = {host: "localhost", dialect: "mysql"};

const connection = new Sequelize(nomeBanco, user, password, config);

module.exports = connection;