const Yup = require('yup')
const User = require('../models/user')

class UserController {

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6)
    })

    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({error: 'Validation fails'})
      }

      const { name, email, password } = req.body
      const userExists = await User.findOne({ where: { email }})

      if (userExists) {
        return res.status(409).json({ error: 'User alredy exists' })
      }

      const user = await User.create({ name, email, password })
      user.password_hash = undefined
      user.password = undefined

      return res.json(user)

    } catch (err) {
      console.log('Something went wrong: ', err)
      return res.status(500).json({error: 'Uncaught error, try again'})
    }
  }

}

module.exports = new UserController()