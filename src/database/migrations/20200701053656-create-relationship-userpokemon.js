module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_pokemons', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        references: { model: 'users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      pokemon_id: {
        allowNull: false,
        references: { model: 'pokemons', key: 'id' },
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
    await queryInterface.dropTable('user_pokemons')
  }
}