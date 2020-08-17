const Comentario = require("../models/Comentario");
const Postagem = require("../models/Postagem");
const { findByPk } = require("../models/Comentario");
const Aluno = require("../models/Aluno");


module.exports = {

    async index(req, res) {

        const idPostagem = req.params.id;

        const comentarioPostagem = await Postagem.findByPk(idPostagem, {
            include: {
                model: Comentario,
                include: {
                    model: Aluno,
                    attributes: ["id", "nome"]}
            },
            attributes: [],
            order: [["created_at", "ASC"]]
            
        });

        if (!comentarioPostagem) {
            res.status(404).send({error: "A postagem não foi encontrada"});
        }

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
            let comentario = await postagem.createComentario({
                descricao,
                aluno_id: created_aluno_id,
            });

            comentario = comentario.dataValues;

            comentario.postagem_id = comentario.PostagemId;
            delete comentario.PostagemId;
            delete comentario.AlunoId;
    
            res.status(201).send(comentario);

        } catch (error) {
            res.send("Deu erro parceiro: " + error);

        }

        
    }

}