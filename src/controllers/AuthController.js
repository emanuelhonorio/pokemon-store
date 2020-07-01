const User = require('../models/user')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { secret, expiresIn } = require('../config/auth')
const Yup = require('yup')

class AuthController {

  async authenticate(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails'})
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (!(await compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const { id, name, coins } = user
    const token = await sign({ id: id }, secret, { expiresIn })

    return res.json({ user: { id, email, name, coins }, token })
  }
}

module.exports = new AuthController()