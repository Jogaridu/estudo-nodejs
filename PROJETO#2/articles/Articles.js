const Sequelize = require("sequelize");
const connection = require("../database/conexao");
const Category = require("../categories/Category");

const Article = connection.define("tblArtigos", {
    title: {
        type: Sequelize.STRING,
        allownull: false
    },

    slug: {
        type: Sequelize.STRING,
        allownull: false
    },
    
    body: {
        type: Sequelize.TEXT,
        allownull: false
    }
});

// BelongsTo() -> Função que indica uma tabela pertence a outra. Método utilizado para relacionamento de 1 para 1
// Nesse caso estamos dizendo que o artigo pertence a tabela de Categoria
Article.belongsTo(Category);

// hasMany() -> Função que indica uma tabela pertence a outra. Método utilizado para relacionamento de 1 para N
// Nesse caso estamos dizendo que a categoria possui muitos artigos
Category.hasMany(Article);

module.exports = Article;