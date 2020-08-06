const express = require("express");

const router = express.Router();

const Category = require("./Category");

const Slugify = require("slugify");
const { default: slugify } = require("slugify");
const adminAuth = require("./../middleware/adminAuth");

router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {
    const title = req.body.title;

    title != undefined? Category.create({
       title: title,
       slug: slugify(title)// Transforma a string em tudo minúsculo com separação de hífen
        
    }).then(() => res.redirect("/admin/categories")) : res.redirect("admin/categories/new");
});

router.get("/admin/categories", adminAuth, (req, res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });
    
});

router.post("/categories/delete", adminAuth, (req, res) => {

    const id = req.body.id;

    isNaN(id)? res.redirect("admin/categories"):"";

    if (id != undefined && !isNaN(id)) {

        // destroy -> Comando para fazer o delete de algum dado. Como o DELETE FROM no SQL
        Category.destroy({
            where: {
                id: id
            }
        }).then(() => res.redirect("/admin/categories"))

    } else {
        res.redirect("/admin/categories");

    }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {

    const id = req.params.id;

    Category.findByPk(id).then(category => {
        if (category != undefined) {

            res.render("admin/categories/edit", {category: category});

        } else {

            res.redirect("admin/categories");

        }

    }).catch(err => {

        res.redirect("admin/categories");

    });
});

router.post("/categories/update", adminAuth, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    // update() -> Atualizar um dado no banco de dados. Como o UPDATE do SQL
    Category.update({title: title, slug: slugify(title)}, {where: {id: id}}).then(() => res.redirect("/admin/categories"));

});

module.exports = router;