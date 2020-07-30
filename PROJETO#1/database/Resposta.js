const conexao = require("./database");
const Sequelize = require("sequelize");

const Resposta = conexao.define("tblResposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    idPergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


Resposta.sync({force: false});

module.exports = Resposta;