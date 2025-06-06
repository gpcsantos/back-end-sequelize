'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pedidos',
      'cliente_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      // 'mais_um_campo',
      // {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'clientes',
      //     key: 'id'
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'RESTRICT',
      // }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('pedidos', 'cliente_id');
  }
};
