const Postagem = require("./../models/Postagem");
const {Op} = require("sequelize");


module.exports = {
    // lista todos as postagens
    async index(req, res) {
        
        const postagens = await Postagem.findAll({
            order: [["created_at", "DESC"]],
            include: {
                association: "Aluno",
                attributes: ["id", "nome", "ra"]
            }
        });

        res.send(postagens);
        
    },

    async buscarPorId(req, res) {

        
    },

    // insere postagem no banco
    async store(req, res) {

        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const {titulo, descricao, imagem, gists} = req.body;

        try {
            
            const aluno = Aluno.findByPk(created_aluno_id);

            if (!aluno) {
                res.status(404).send("Aluno não encontrado!");
            }

            let post = await aluno.createPostagem({
                titulo,
                descricao,
                imagem,
                gists,
                created_aluno_id
            });

            res.status(201).send(post);
            
        } catch (error) {
            return res
            .status(500)
            .send({error: "Não foi possível adicionar postagem, tente novamento mais tarde!"})
        }

    },

    update() {},
    
    async delete(req, res) {
        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const id = req.params.id;

        let postagem = await Postagem.findByPk(id);

        if (!postagem) {
            return res.status(404).send({erro: "Aluno não cadastrado"});
        }

        if (postagem.created_aluno_id != created_aluno_id) {
            return res.status(401).send("Você não tem permissão para excluir essa postagem");
        }

        await postagem.destroy();

        res.status(204).send();
    }
    
}