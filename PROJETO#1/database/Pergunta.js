const Sequelize = require("sequelize");
const conexao = require("./database");

/*
    define(nomeTabela, {campos}) O método define cria uma tabela no banco
     - nomeTabela -> Nome da tabela no banco de dados
     - campos -> Aqui será passado o nome dos campos
*/

const Pergunta = conexao.define("tblPergunta", {
    // O JSON abaixo seria o mesmo que "titulo varchar NOT NULL;" no SQL
    titulo : {
        type: Sequelize.STRING,
        allowNull: false 
    },

    descricao : {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Comando abaixo cria a tabela caso ela não exista no banco.
// - force: false -> Quer dizer para não forçar uma criação caso a tabela exista
Pergunta.sync({force: false});

// É necessário exportar a tabela, para salvar dados nela no index.js
module.exports = Pergunta;