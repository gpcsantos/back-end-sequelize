const Sequelize = require('sequelize');
const database = require('../db/conn');

const Produtos = database.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    preco: {
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

module.exports = Produtos;
