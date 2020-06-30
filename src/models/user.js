const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')

class User extends Model {

  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      coins: DataTypes.INTEGER,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      user.password_hash = undefined
      
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
  }
  
  static associate(models) {
    // define association here
  }
};

module.exports = User;