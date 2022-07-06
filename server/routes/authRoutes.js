const express = require('express')
const { body } = require('express-validator')
const { registration, login, logout, activate, refresh } = require('../controllers/authControllers')

const router = express.Router()

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 8 }), registration)
router.post('/login', body('email').isEmail(), login)
router.post('/logout', logout)
router.get('/activate/:link', activate)
router.get('/refresh', refresh)

module.exports = router