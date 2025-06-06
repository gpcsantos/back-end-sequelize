const Sequelize = require('sequelize');
const database = require('../db/conn');

const pedidos = require('./pedidos');
const produtos = require('./produtos');

const rlPedidosProdutos = database.define('rel_pedidos_produtos', {
  pedidoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  produtoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  valorUnitario: {
    type: Sequelize.DECIMAL(8, 2),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
},
  { underscored: true },
  { freezeTableName: true }
)

pedidos.belongsToMany(produtos, { through: rlPedidosProdutos });
produtos.belongsToMany(pedidos, { through: rlPedidosProdutos });

module.exports = rlPedidosProdutos;
