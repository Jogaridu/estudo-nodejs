const Sequelize = require("sequelize");
const dbConfig = require("./../config/database");

const Aluno = require("./../models/Aluno");
const Postagem = require("../models/Postagem");
const Comentario = require("../models/Comentario");

const connection = new Sequelize(dbConfig);

Aluno.init(connection);
Postagem.init(connection);
Comentario.init(connection);

Aluno.associate(connection.models);
Postagem.associate(connection.models);
Comentario.associate(connection.models);

module.exports = connection;