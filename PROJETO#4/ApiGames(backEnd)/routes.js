const express = require("express");
const router = express.Router();
const valCampos = require("./src/Middleware/validarCampos");
const gamesController = require("./src/Controller/gamesController");

// Listagem de todos os jogos
router.get("/games", gamesController.index);

// Busca de um jogo específico por ID
router.get("/game/:id", gamesController.findById);

// Cadastro de um jogo
router.post("/games", valCampos, gamesController.store);

router.delete("/game/:id", gamesController.delete);

router.put("/game/:id", gamesController.update);

module.exports = router;