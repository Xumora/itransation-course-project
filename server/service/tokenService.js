const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        return tokenData
    }

    validateRefreshToken(token) {
        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        return tokenData
    }
}

module.exports = new TokenService()