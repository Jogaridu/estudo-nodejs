const express = require("express"); // Importando o express
const app = express(); // Iniciando o express


/*
    Criação de uma rota

    IMPORTANTE = Toda rota precisa ter uma resposta do servidor e toda rota só pode ter uma única resposta

    get(rota, callback(requisicao, resposta))
     - rota -> É o endereço que o usuário será direcionado
     - callback -> Alguma função a ser executada quando direcionar para a rota
     - requisicao -> Serve para guardar qualquer dado do usuário, escrito na URL
     - resposta -> Aqui será o que você irá mandar para a tela do usuário.
*/
app.get("/", function (req, res) {
    res.send("Bem vindo Jorge."); // send() -> Escreve no corpo do HTML um texto
});

app.get("/blog", function (req, res) {
    res.send("Bem vindo ao meu blog, JORGE.");
});

app.get("/canal/youtube", function (req, res) {

    // Funciona como o PHP, este comando serve para pegar dados de variáveis da URL. Usado em formulário
    const canal = req.query['canal'];

    if (canal) {
        res.send(`Bem vindo ao meu canal: ${canal}`);

    } else {
        res.send("Nenhum canal informado!")

    }
    
});

// Para pegar algum dado do usuário, basta colocar na rota dessa maneira -> /rota/:variavel?
// O ponto de interrogação faz com que não seja obrigatório o parâmetro
app.get("/ola/:nome/:empresa?", function (req, res) {
    // Para resgatar os dados escritos na url segue o caminho -> req.params.variavel
    const nome = req.params.nome;
    const empresa = req.params.empresa;

    if (empresa) {
        res.send(`<h1>Olá ${nome} <br> Sua empresa é: ${empresa}</h1>`);

    } else {
        res.send(`<h1>Olá ${nome}</h1>`);

    }
    
    
})

/*
    listen(porta, callback(erro))
     - porta -> Será a porta do servidor
     - callback -> Alguma função a ser executada quando iniciar o servidor
     - erro -> Caso dê erro, será atribuída a mensagem para este parâmetro
*/

app.listen(3000, function(erro) {
    if (erro) {
        console.log("Um erro aconteceu");

    } else {
        console.log("Servidor iniciado com sucesso!!!");

    }
});

// npm install nodemon -g -> Framework para reiniciar o servidor toda vez que houver uma mudança.
// -g -> Instala globalmente no computador, ele não se limita ao projeto