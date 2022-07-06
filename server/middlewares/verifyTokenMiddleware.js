const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(403).send('User is not authorized')
    }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send('Token is not valid')
        }
        req.user = decoded
        next()
    })
}