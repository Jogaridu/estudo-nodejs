// Esse arquivo tem como resposabilidade cadastrar as rotas da aplicação

const express = require("express");

const routes = express.Router();

const alunoController = require("./controller/alunoController");
const postagemController = require("./controller/postagemController");

// Rota - Alunos
routes.get("/alunos", alunoController.index);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos/cadastrar", alunoController.store);

// Rota - Postagens
routes.post("/postagens/cadastrar", postagemController.store);
routes.delete("/postagens/deletar/:id", postagemController.delete);

module.exports = routes;