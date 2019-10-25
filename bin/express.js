const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const variables = require("../bin/configuration/variables");

//routers
const categoriaRouter = require("../routes/catergoria-router");
const produtoRouter = require("../routes/produto-router");
const usuarioRouter = require("../routes/usuario-router");
const pedidoRouter = require("../routes/pedido-router");
const operadorRouter = require("../routes/operador-router");
const enderecoEntregaRouter = require("../routes/endereco-entrega-router");

//Criando/Invocando a Api/Server Web do Express
const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    //res.setHeader("x-access-token", true);
    next();
});

//Configuração de parse do JSON
app.use(
    bodyParser.json({
        limit: "10mb"
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "10mb",
        extended: false
    })
);

//Configurando a conexão com banco de dados
mongoose.connect(variables.Database.connection, {
    useNewUrlParser: true
});

//Configurando as rotas
app.use("/api/categoria", categoriaRouter);
app.use("/api/produto", produtoRouter);
app.use("/api/usuario", usuarioRouter);
app.use("/api/pedido", pedidoRouter);
app.use("/api/operador", operadorRouter);
app.use("/api/enderecoEntrega", enderecoEntregaRouter);

//Exportando nossa Api
module.exports = app;

// Api -> MIDDLEWARES -> Rotas -> Controller -> Repository -> Banco