const Sequelize = require('sequelize');
const database = require('../db/conn');

const Pedidos = require('./pedidos');

const Clientes = database.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(15),
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

// has many - TEM VÁRIOS: neste caso um cliente pode ter vávios pedidos
Clientes.hasMany(Pedidos, { as: 'pedidos' })

// belongs To - PERTENCE A: cada pedido pertence à SOMENTE um cliente
Pedidos.belongsTo(Clientes, { foreignKey: 'clienteId' })

module.exports = Clientes;
