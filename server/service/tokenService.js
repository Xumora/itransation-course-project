const jwt = require('jsonwebtoken')

class TokenService {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
    }
}

module.exports = new TokenService()