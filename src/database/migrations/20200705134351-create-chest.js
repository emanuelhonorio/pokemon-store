module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chests', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        defaultValue: 9999,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chests')
  }
}