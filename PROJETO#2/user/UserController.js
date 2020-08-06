const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const { Router } = require("express");
const { json } = require("body-parser");
const adminAuth = require("./../middleware/adminAuth");

router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => users != undefined? res.render("admin/users/index", {users: users}) : res.redirect("/"));
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/new");
});

router.post("/users/create", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if (user == undefined) {

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            User.create({

                email: email,
                senha: hash

            })
            .then(() => res.redirect("/"))
            .catch(error => res.redirect("/"));

        } else {

            res.redirect("/admin/users/create");

        }
    })
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({where: {email: email}}).then(user => {

        if (user != undefined) {

            // compareSync(senhaBanco, senhaFormulario) -> Compara e valida duas senhas e retorna true ou false se forem iguais
            const correct = bcrypt.compareSync(password, user.senha);

            if(correct) {

                req.session.user = {
                    id: user.id,
                    email: user.email
                }

                res.redirect("admin/articles");


            } else {
                res.redirect("/login");

            }

        } else {
            res.redirect("/login");

        }

    }).catch(error => res.send("Erro de: " + error))
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;