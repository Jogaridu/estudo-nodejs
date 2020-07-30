const express = require("express");

const app = express();

// Bodyparser é resposável por pegar todos os dados do formulário
// INSTALAÇÃO: npm install body-parser --save
const bodyParser = require("body-parser");

// Importando conexão com o banco de dados
const conexao = require("./database/database");

// Importanto a tabela criada.
// Model -> É converter código Javascript  para criar uma estrutura no banco de dados
const modelPergunta = require("./database/Pergunta");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Autenticando o banco com o método authenticate()
conexao
        .authenticate()
        .then(() => console.log("Conexão com banco feita com sucesso"))
        .catch((erro) => console.log("Erro ao realizar conexão com o banco. Erro: " + erro));


// Estou dizendo para o Express usar o EJS como view engine
app.set("view engine", "ejs");

// Define qual será a pasta que terá os arquivos estáticos. Por padrão de mercado utilize public
// Arquivos estáticos são: css, imagens, scripts etc
app.use(express.static("public"));

// Com essa configuração o usuário tem permissão para enviar os dados da página para o back-end. Essa linha abaixo decodifica
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // Os dados do formulário são transformado em JSON


// Rotas
app.get("/", (req, res) => {

    // FindAll é como o "SELECT * from tblPergunta" no SQL
    // E retorna uma promise com todos os dados da tabela, dentro de um JSON
    Pergunta.findAll({

        raw: true, // Aqui trás só os dados dp banco
        order: [["id", "DESC"]] // Aqui é para ordenar a pesquisa pelo id e DECRESCENTE

    }).then(perguntasBanco => res.render("index", {perguntas: perguntasBanco}));

    
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar")

});

app.post("/salvarpergunta", (req, res) => {

    // O bodyparser disponibiliza o objeto body
    const tituloPergunta = req.body.titulo;
    const descricaoPergunta = req.body.descricao;

    // create() -> É o mesmo que "INSERT INTO tblPergunta"
    // Ou seja o comando a cima inseri dados em campos na tabela
    modelPergunta.create({

        /* campo -> */titulo: tituloPergunta /* <- dado */,
        descricao: descricaoPergunta

    }).then(() => res.redirect("/")); // Redireciona para a página principal
});

app.get("/pergunta/:id", (req, res) => {

    const id = req.params.id;

    // findOne() -> Realiza o select de um dado
    Pergunta.findOne({
        where: {id: id} // dando a condição que o id da URL deve ser igual ao id do BANCO
    }).then(perguntaBanco => {
        if (perguntaBanco != undefined) {

            Resposta.findAll({
                where: {idPergunta: perguntaBanco.id},
                order: [["id", "DESC"]]

            }).then(respostas => {
                res.render("exibirPergunta", {pergunta: perguntaBanco, respostas: respostas});
            });

            

        } else {
            res.redirect("/");

        }
    });
});

app.post("/responder", (req, res) => {

    const corpo = req.body.corpo;
    const idPergunta = req.body.idPergunta;

    Resposta.create({
        corpo: corpo,
        idPergunta: idPergunta
    }).then(() => res.redirect(`/pergunta/${idPergunta}`));

});

app.listen(3000, (error) => {
    if (error) {
        console.log("Deu erro: " + error);

    } else {
        console.log("Deu certo a conexão!")

    }
    
});