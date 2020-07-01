const { verify } = require('jsonwebtoken')
const { promisify } = require('util')
const { secret } = require('../config/auth')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: 'Token not provided' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(403).json({ error: 'Invalid token' })
  }

  const [bearer, token] = parts

  if (bearer.toLowerCase() !== 'bearer') {
    return res.status(403).json({ error: 'Invalid token' })
  }

  const payload = await promisify(verify)(token, secret)
  req.userId = payload.id

  next()
}