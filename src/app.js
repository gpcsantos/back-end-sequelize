const express = require("express");
const sequelize = require('../db/conn')
const data_produtos = require('../produtos');
const produtos = require('../models/produtos');
const clientes = require('../models/clientes');
const pedidos = require('../models/pedidos')
const rlPedidosProdutos = require('../models/rel_pedidos_produtos')
const app = express();

// analisar o payload JSON recebido e disponibilizar esses dados no  req.body  
app.use(express.json());

// Rota "/" Raiz.. Mensagem de teste de funcionamento - Excluir no futuro
// caso não seja necessário
app.get('/', (req, res) => {
    res.status(200).send("Mensagem teste - API UP!")
});

// ##### ROTAS PRODUTO  #########
//rota "/produto" processa requisições para a rota
app.get('/produtos', async (req, res, next) => {
    try {
        // res.status(200).send(data_produtos)
        res.status(200).send(await produtos.findAll())
    } catch (error) {
        throw error;
    }
})
app.get('/produtos/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        res.status(200).send(await produtos.findByPk(id))
    } catch (error) {
        throw error;
    }
})
app.post('/produtos', async (req, res, next) => {
    try {
        const produto = req.body;
        const produto_data = {
            "descricao": produto.descricao,
            "preco": produto.preco
        }
        res.status(200).send(await produtos.create(produto_data))
    } catch (error) {
        throw error;
    }
})

// ##### FIM ROTAS PRODUTO  #########

// ##### ROTAS CLIENTES  #########
app.get('/clientes', async (req, res, next) => {
    try {
        // res.status(200).send(data_produtos)
        res.status(200).send(await clientes.findAll())
    } catch (error) {
        throw error;
    }
})
app.get('/clientes/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        res.status(200).send(await clientes.findByPk(id))
    } catch (error) {
        throw error;
    }
})
app.post('/clientes', async (req, res, next) => {
    try {
        const cliente = req.body;
        const cliente_data = {
            "nome": cliente.nome,
            "email": cliente.email,
            "cpf": cliente.cpf
        }
        res.status(200).send(await clientes.create(cliente_data))
    } catch (error) {
        throw error;
    }
})
// ##### FIM ROTAS CLIENTES  #########

// ##### ROTAS PEDIDOS  #########
app.get('/pedidos/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        //RAW QUERY - sequelize é a conexão com o banco
        const [results, metadata] = await sequelize.query(
            'SELECT p.id, p.created_at, prod.descricao, rpp.quantidade, rpp.valor_unitario ' +
            'FROM pedidos AS p INNER JOIN ' +
            'rel_pedidos_produtos AS rpp ON p.id=rpp.pedido_id INNER JOIN ' +
            'produtos AS prod ON prod.id=rpp.produto_id ' +
            'WHERE p.id=' + id);
        res.status(200).send(results);
    } catch (error) {
        throw error;
    }
})
app.get('/pedidos', async (req, res, next) => {
    try {
        const id = req.params.id
        res.status(200).send(await pedidos.findAll())
    } catch (error) {
        throw error;
    }
})
app.post('/pedidos', async (req, res, next) => {
    try {
        const pedido = req.body;
        const clienteId = parseInt(pedido.clienteId)
        const cliente = await clientes.findByPk(clienteId)
        // Verifica se cliente existe
        if (!cliente) {
            const err = new Error('Cliente Not Found');
            err.status = 400;
            // console.log(err.status);
            next(err);
        }
        const pedido_data = {
            "clienteId": clienteId,
        }

        const pedido_criado = await pedidos.create(pedido_data)
        const id_pedido_cirado = parseInt(pedido_criado.id)

        const incluiProdutos = new Promise(async (resolve, reject) => {
            try {
                // Use map para criar um array de Promises
                const promessas = pedido.produtos.map(async produto => {
                    const produto_data = {
                        pedidoId: id_pedido_cirado,
                        produtoId: parseInt(produto.id),
                        quantidade: parseInt(produto.quantidade),
                        valorUnitario: parseFloat(produto.valorUnitario),
                    };
                    await rlPedidosProdutos.create(produto_data);
                });

                // Aguarde todas as Promises
                await Promise.all(promessas);

                resolve();
            } catch (error) {
                console.error("Erro ao incluir produtos:", error);
                reject(error);
            }
        });

        // Agora apenas aguarde a Promise incluiProdutos
        incluiProdutos.then(async () => {
            res.status(200).send(
                await pedidos.findAll({
                    where: { id: id_pedido_cirado },
                    attributes: ['id', 'createdAt'],
                    include: [{
                        model: produtos,
                        attributes: ['descricao'],
                    }],
                })
            );
        }).catch(error => {
            console.error("Erro na promise incluiProdutos:", error);
            const err = new Error('Erro ao processar o pedido');
            err.status = 500;
            next(err);
        });


    } catch (error) {
        throw error;
    }
})
// ##### FIM ROTAS PEDIDOS  #########


// realiza tratamento de erro quando rota não encontrada - erro 404 page not fount!
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    console.log(err.status);
    next(err);
});

// caso tenha erro, envia o erro e mensagem 
app.use((err, req, res, next) => {
    res.status(err.status).send({ error: err.message })
})

module.exports = app;