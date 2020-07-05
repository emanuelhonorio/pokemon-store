const pokemons = require('../../data/pokemons')

pokemons.forEach(pokemon => {

  let price = 9999
  switch (pokemon.rarity) {
    case 'COMMON': price = 100; break;
    case 'RARE': price = 200; break;
    case 'SUPER_RARE': price = 300; break;
    case 'ULTRA_RARE': price = 400; break;
  }

  pokemon.price = price
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
