const Yup = require('yup')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

class MeController {
  async find(req, res) {
    const { userId } = req

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] },
      include: { association: 'pokemons' , through: { attributes: [] } }
    })
    return res.json(user)
  }

  async buyPokemon(req, res) {
    const { userId } = req
    const { pokemonId } = req.params

    const schema = Yup.number()
    if (!(await schema.isValid(pokemonId))) {
      return res.status(400).json({error: 'Validation fails'})
    }

    const pokemon = await Pokemon.findByPk(pokemonId, { attributes: ['id', 'price'] })

    if (!pokemon) {
      return res.status(400).json({error: 'Pokémon not found'})
    }

    const user = await User.findByPk(userId, {
      attributes: ['id', 'coins'],
      include: {
        association: 'pokemons',
        attributes: ['id', 'price'],
        through: { attributes: []},
        required: false,
        where: {
          id: pokemonId,
        }
      }
    })

    if (!user) {
      return res.status(403).json({error: 'User not found'})
    }

    if (user.pokemons.length > 0) {
      return res.status(400).json({error: 'You already have this pokemon'})
    }

    if (user.coins < pokemon.price) {
      return res.status(400).json({error: 'You do not have enough money'})
    } 

    await user.addPokemon(pokemon)
    await User.update({ coins: user.coins - pokemon.price }, { where: { id: userId }})

    const newUser = await User.findByPk(userId, {
      attributes: { exclude: ['password_hash'] },
      include: { association: 'pokemons', through: { attributes: [] } }
    })
    return res.json(newUser)
  }
  
}

module.exports = new MeController()