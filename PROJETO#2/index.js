const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const connection = require("./database/conexao");
const session = require("express-session");

// Rotas
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./user/UserController");

const Article = require("./articles/Articles");
const Category = require("./categories/Category");
const User = require("./user/User");

// View engine
app.set("view engine", "ejs");

// Arquivos estáticos
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Conexão com o banco
connection.authenticate()
                        .then(() => console.log("Conexão com o banco feita com sucesso!!!"))
                        .catch((error) => console.log("Falha na conexão com o banco: " + error));

// Sessions - LOGIN DE USUÁRIO
app.use(session({
    secret: "senha", // Senha para decriptar as sessões
    cookie: {
        maxAge: 30000 // Tempo para expirar a sessão
    }
}));

// O primeiro parâmetro é uma prefixo para a rota. Nesse caso é obrigatório o prefixo e em seguida dele vem as rotas do
// arquivo importado
app.use("/", categoriesController); // Esse comando diz que você está utilizando todas as rotas importadas de outro arquivo
app.use("/", articlesController);
app.use("/", usersController);


app.get("/", (req, res) => {

    Article.findAll({

        order: [["id", "DESC"]],
        limit: 4

    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
        
    });

});

app.get("/:slug", (req, res) => {

    const slug = req.params.slug;

    Article.findOne({
        where : {
            slug: slug
        }
    })
    .then(article => article != undefined?

        Category.findAll().then(categories => {

            res.render("articles", {article: article, categories: categories})

        }) : res.redirect("/"))

    .catch(() => res.redirect("/"));

});

app.get("/category/:slug", (req, res) => {

    const slug = req.params.slug;

    Category.findOne({

        where: {
            slug: slug
        },

        include: [{model: Article}]
    })
    .then(category => category != undefined?

        Category.findAll().then(categories => {

            res.render("index", {articles: category.tblArtigos, categories: categories});

        }) : res.redirect("/"))

    .catch(err => res.redirect("/"))


});

app.listen(3000, () => {

    console.log("Servidor iniciado");

});