const pokemons = require('../../data/pokemons')

pokemons.forEach(pokemon => {
  pokemon.created_at = new Date()
  pokemon.updated_at = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pokemons', pokemons)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pokemons', null, {})
  }
};
