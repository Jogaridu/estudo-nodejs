const Sequelize = require("sequelize");

const connection = new Sequelize("dbBlogProgramador", "root", "", {
    host: "localhost", 
    dialect: "mysql",
    timezone: "-03:00" // Na criação de dados, o horario será ajustado para o brasil
});

module.exports = connection;
