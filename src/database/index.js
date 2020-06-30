const Sequelize = require("sequelize")
const databaseConfig = require('../config/database')
const User = require('../models/user')
const Ṕokemon = require('../models/pokemon')

const models = [User, Ṕokemon]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models.forEach(model => model.init(this.connection))
  }
}

module.exports = new Database()