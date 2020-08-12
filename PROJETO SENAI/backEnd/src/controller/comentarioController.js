const Comentario = require("../models/Comentario");
const Postagem = require("../models/Postagem");
const { findByPk } = require("../models/Comentario");


module.exports = {

    async index(req, res) {

        const idPostagem = req.params.id;

        const comentarioPostagem = await Postagem.findByPk(idPostagem, {
            include: Comentario,
            
        });

        res.status(200).send(comentarioPostagem);

    },

    async store(req, res) {

        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const idPostagem = req.params.id;

        const {descricao} = req.body;

        try {

            const postagem = await Postagem.findByPk(idPostagem);

            if (!postagem) {
                return res.status(404).send("Postagem não encontrado.");
            }

            // Cadastro de comentário
            const comentario = await postagem.createComentario({
                descricao: descricao,
                aluno_id: created_aluno_id,
            });
    
            res.status(201).send(comentario);

        } catch (error) {
            res.send("Deu erro parceiro: " + error);

        }

        
    }

}