const Sequelize = require('sequelize');
const database = require('../db/conn');

const Pedidos = database.define('pedidos', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    clienteId: {
        type: Sequelize.INTEGER,
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

module.exports = Pedidos;
