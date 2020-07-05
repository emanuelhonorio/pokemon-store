const Sequelize = require("sequelize")
const databaseConfig = require('../config/database')
const User = require('../models/user')
const Pokemon = require('../models/pokemon')
const Chest = require("../models/chest")

const models = [Pokemon, User, Chest]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models
      .map(model => {
        model.init(this.connection)
        return model
      })
      .map(model => {
        model.associate && model.associate(this.connection.models)
        return model
      })
  }
}

module.exports = new Database()