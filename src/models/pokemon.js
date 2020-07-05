const { Model, DataTypes } = require('sequelize');

class Pokemon extends Model {

  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      rarity: DataTypes.ENUM(['COMMON', 'RARE', 'SUPER_RARE', 'ULTRA_RARE']),
      price: DataTypes.INTEGER,
      image_url: {
        type: DataTypes.VIRTUAL,
        get: function() {
          const id = this.get('id')
          const num = '0'.repeat(3 - ((id+'').length)) + id
          return 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+num+'.png'
        }
      },
      owned: DataTypes.VIRTUAL,
    }, {
      sequelize,
      modelName: 'Pokemon',
    });
  }
  
  static associate(models) {
    Pokemon.belongsToMany(models.User, {
      through: 'user_pokemons',
      as: 'users',
      foreignKey: 'pokemon_id'
    })
    Pokemon.belongsToMany(models.Chest, {
      through: 'pokemon_chests',
      as: 'chests',
      foreignKey: 'pokemon_id',
    })
  }
};

module.exports = Pokemon;