const express = require("express");

const app = express();

const connection = require("./src/Database/database");

const routes = require("./routes");

app.use(express.json());
app.use(routes);


connection.authenticate()
                        .then(() => console.log("Conexão com o banco feita com sucesso!!!"))
                        .catch((error) => console.log("Falha na conexão com o banco: " + error));

app.listen(3333, () => {
    console.log("API rodando na porta 3333");
})