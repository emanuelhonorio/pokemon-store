const { Model, DataTypes } = require('sequelize');

class Pokemon extends Model {

  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      image_url: {
        type: DataTypes.VIRTUAL,
        get: function() {
          const id = this.get('id')
          const num = '0'.repeat(3 - ((id+'').length)) + id
          return 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+num+'.png'
        }
      },
      rarity: DataTypes.ENUM(['COMMON', 'RARE', 'SUPER_RARE', 'ULTRA_RARE']),
    }, {
      sequelize,
      modelName: 'Pokemon',
    });
  }
  
  static associate(models) {
    // define association here
  }
};

module.exports = Pokemon;