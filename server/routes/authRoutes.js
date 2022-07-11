const express = require('express')
const { body } = require('express-validator')
const { registration, login, activate, guestLogin } = require('../controllers/authControllers')

const router = express.Router()

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 8 }), registration)
router.post('/login', body('email').isEmail(), login)
router.get('/activate/:link', activate)
router.post('/guest', guestLogin)

module.exports = router