const express = require("express");

const router = express.Router();

const Category = require("./../categories/Category");
const Article = require("./Articles");
const slugfy = require("slugify");
const { default: slugify } = require("slugify");
const adminAuth = require("./../middleware/adminAuth");

router.get("/admin/articles", adminAuth, (req, res) => {

    // O comando abaixo possui um WHERE escondido: 
    // SELECT tblArticles.*, tblCategory.id FROM tblArticles, tblArticles WHERE tblArticles.id = tblCategory.id
    // O include pode não especificar mas ele faz a comparação de IDs perfeitamente. Olhe a index.ejs
    Article.findAll({

        include: [{model: Category}] // Esse comando falar para incluir todos os dados da tabela de Category também
 
    }).then(articles => {

        res.render("admin/articles/index", {articles: articles});

    });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {

    Category.findAll().then(categories => {

        res.render("admin/articles/new", {categories: categories})

    });
   
});

router.post("/articles/save", adminAuth, (req, res) => {

    const title = req.body.title;
    const article = req.body.body;
    const idCategory = req.body.idCategory;

    Article.create({
        title: title,
        slug: slugfy(title),
        body: article,
        tblCategoriumId: idCategory
    }).then(() => res.redirect("/admin/articles"));
   
});

router.post("/articles/delete", adminAuth, (req, res) => {

    const id = req.body.id;

    if (id != undefined && !isNaN(id)) {

        Article.destroy({
            
            where : {id: id}

        }).then(() => res.redirect("/admin/articles"))

    } else {

        res.redirect("/admin/articles");

    }

});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    
    const id = req.params.id;

    Article.findByPk(id)
    .then(article => article != undefined? 
        
        Category.findAll().then(categories => res.render("admin/articles/edit", {article: article, categories: categories})) : 
        res.redirect("/admin/articles"))

    .catch(error => res.redirect("/admin/articles"))

});

router.post("/articles/update", adminAuth, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const idCategory = req.body.idCategory;

    Article.update({

        title: title,
        slug: slugify(title),
        body: body,
        tblCategoriumId: idCategory

    }, {where: {id: id}}).then(() => res.redirect("/admin/articles")).catch(erro => res.send(erro))

});

router.get("/articles/page/:num", (req, res) => {

    const page = parseInt(req.params.num) - 1;
    const elementsInPage = 4;
    let offset = 0;

    if(isNaN(page) || page === 0) {
        offset = 0;

    } else {
        offset = page * 4;

    }

    // findAndCountAll() -> A mesma coisa que o findAll() mas, esse retorna também o numero de informações na tabela
    Article.findAndCountAll({
        order: [["id", "DESC"]],
        limit: elementsInPage, // Limita o número máximo de buscas
        offset: offset // offset informa a partir de qual posição da lista pega o dado

    }).then(articles => {

        const next = offset + elementsInPage >= articles.count? false:true;

        const result = {
            next: next,
            articles: articles,
            page: page
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories})
            
        });

    });
});

module.exports = router;