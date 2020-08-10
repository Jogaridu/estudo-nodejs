const Sequelize = require("sequelize");
const dbConfig = require("./../config/database");

const Aluno = require("./../models/Aluno");
const Postagem = require("../models/Postagem");

const connection = new Sequelize(dbConfig);

Aluno.init(connection);
Postagem.init(connection);

Aluno.associate(connection.models);
Postagem.associate(connection.models);

module.exports = connection;