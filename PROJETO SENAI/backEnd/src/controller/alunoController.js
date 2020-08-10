const Aluno = require("./../models/Aluno");
const {Op} = require("sequelize");

module.exports = {
    // lista todos os alunos
    async index(req, res) {

        const alunos = await Aluno.findAll();

        res.send(alunos);
    },

    async buscarPorId(req, res) {

        const idAluno = req.params.id;

        const aluno = await Aluno.findByPk(idAluno, {raw: true});

        if (!aluno) { 
            res.send("Erro ao buscar aluno");    

        }
        
        delete aluno.senha;

        res.send(aluno);
    },

    // insere aluno no banco
    async store(req, res) {

        const aluno = req.body;

        // verificar se o aluno ja existe
        let alunoCriado = await Aluno.findOne({
            where: {
                [Op.or]: [
                    {ra: aluno.ra},
                    {email: aluno.email}
                ]}
        });

        if (alunoCriado) {
            return res.status(400).send("Aluno ja cadastrado");
        }

        alunoCriado = await Aluno.create(aluno)

        res.status(201).send(alunoCriado);

    },

    update() {},
    delete() {}
    
}