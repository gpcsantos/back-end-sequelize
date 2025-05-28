const express = require("express");
const produtos = require('../produtos');
const app = express();

// analisar o payload JSON recebido e disponibilizar esses dados no  req.body  
app.use(express.json());

// Rota "/" Raiz.. Mensagem de teste de funcionamento - Excluir no futuro
// caso não seja necessário
app.get('/', (req, res) => {
    res.status(200).send("Mensagem teste - API UP!")
});

//rota "/produto" processa requisições para a rota
app.get('/produtos', (req, res, next) => {
    try {
        res.status(200).send(produtos)
    } catch (error) {
        throw error;
    }
})

// realiza tratamento de erro quando rota não encontrada - erro 404 page not fount!
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err.status);
    next(err);
});


// caso tenha erro, envia o erro e mensagem 
app.use((err, req, res, next) => {
    res.status(err.status).send({ error: err.message })
})

module.exports = app;