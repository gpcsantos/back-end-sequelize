'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rel_pedidos_produtos', {
      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produtos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valor_unitario: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rel_pedidos_produtos')
  }
};
