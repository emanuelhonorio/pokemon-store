const Chest = require('../models/chest')
const User = require('../models/user')
const Yup = require('yup')
const { where } = require('sequelize')

class ChestController {
  
  async list(req, res) {
    const chests = await Chest.findAll({
      include: {
        association: 'pokemons',
        through: { attributes: [] },
      }
    })

    return res.json(chests)
  }

  async store(req, res) {
    const { name, price, pokemons } = req.body

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      pokemons: Yup.array().of(Yup.number()).required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Invalid parameters'}) 
    }

    try {
      const chest = await Chest.create({
        name,
        price
      })
      const pokemonsSaved = await chest.setPokemons(pokemons)

      const chestCreated = await Chest.findByPk(chest.id, {
        include: {
          association: 'pokemons',
          through: { attributes: [] }
        }
      })

      return res.json({chest: chestCreated})
    } catch (err) {
      return res.status(400).json({error: ''})
    }
  }

  async buy(req, res) {
    const { chestId } = req.params
    const { userId } = req

    const schema = Yup.number().required()

    if (!(await schema.isValid(chestId))) {
      return res.status(400).json({ error: 'Invalid parameters' })
    }
    
    let user = await User.findByPk(userId)
    
    const chest = await Chest.findByPk(chestId, {
      include: {
        association: 'pokemons',
        through: { attributes: [] }
      }
    })

    if (!chest) {
      return res.status(400).json({error: 'Chest not found'})
    }

    if (user.coins < chest.price) {
      return res.status(400).json({error: 'You do not have enough coins'})
    }

    const randomPokemonIdx = Math.floor(Math.random() * chest.pokemons.length)
    const randomPokemon = chest.pokemons[randomPokemonIdx]

    if (!(await user.hasPokemon(randomPokemon))) {
      await user.addPokemon(randomPokemon)
    }

    await User.update({coins: user.coins - chest.price}, { where: {id: userId} })
    
    const newUser = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] },
      include: { association: 'pokemons', through: { attributes: [] } }
    })

    return res.json({pokemon: randomPokemon, user: newUser})

  }
}

module.exports =  new ChestController()