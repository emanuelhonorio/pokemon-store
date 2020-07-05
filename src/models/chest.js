const { Model, DataTypes } = require('sequelize');

class Chest extends Model {

  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'chests'
    });
  }
  
  static associate(models) {
    Chest.belongsToMany(models.Pokemon, {
      through: 'pokemon_chests',
      as: 'pokemons',
      foreignKey: 'chest_id'
    })
  }
};

module.exports = Chest;