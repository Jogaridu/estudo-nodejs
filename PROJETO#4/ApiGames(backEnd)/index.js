const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

// const connection = require("./src/Database/database");

const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log("API rodando na porta 3333");
});