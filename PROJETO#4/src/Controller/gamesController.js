const Game = require("./../Models/Game");
const { default: slugify } = require("slugify");

module.exports = {
    // Cadastro de um novo game
    async store (req, res) {
        
        let {title, year, price} = req.body;

        const game = await Game.create({
            title,
            year,
            price,
            slug: slugify(title)
        });

        res.status(201).send(game);
    },

    // Listagem de todos os games
    async index (req, res) {
        const games = await Game.findAll();

        res.status(200).send(games);
    },

    // Busca de um jogo por ID
    async findById(req, res) {

        const idGame = req.params.id;

        try {
            const game = await Game.findByPk(idGame);

            if (!game) {
                return res.status(404).send("Jogo não encontrado");
            }
            
            res.status(200).send(game);

        } catch (error) {
            
            res.status(404).send("O Id requisitado não existe");

        }
    },

    // Deleta um jogo
    async delete (req, res) {
        const idGame = req.params.id;

        try {
            Game.destroy({
                where: {
                    id: idGame
                }
            });

            res.status(200).send("Game deletado com sucesso!");

        } catch (error) {
            
            res.status(404).send("O Id requisitado não existe")

        }
    },

    // Atualiza um jogo
    async update (req, res) {
        const idGame = req.params.id;

        try {
            const game = await Game.findByPk(idGame);

            if (!game) {
                return res.status(404).send("Game não encontrado");
            }

            const {title, year, price} = req.body;

            await Game.update({title, year, price, slug: slugify(title)}, {
                where: {
                    id: game.id
                }
            });

            res.status(200).send("Game atualizado com sucesso");

        } catch (error) {
            
            res.status(404).send("O Id requisitado não existe")

        }
    },
    
}