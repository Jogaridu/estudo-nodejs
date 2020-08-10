const Postagem = require("./../models/Postagem");
const {Op} = require("sequelize");

module.exports = {
    // lista todos os alunos
    async index(req, res) {

        const alunos = await Postagem.findAll();

        res.send(alunos);
    },

    async buscarPorId(req, res) {

        const idAluno = req.params.id;

        const aluno = await Postagem.findByPk(idAluno, {raw: true});

        if (!aluno) { 
            res.send("Erro ao buscar aluno");    

        }
        
        delete aluno.senha;

        res.send(aluno);
    },

    // insere aluno no banco
    async store(req, res) {

        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const {titulo, descricao, imagem, gists} = req.body;

        let post = await Postagem.create({
            titulo,
            descricao,
            imagem,
            gists,
            created_aluno_id
        });

        res.status(201).send(post);

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

        res.status(204).send()
    }
    
}