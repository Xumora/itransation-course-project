const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const User = require('../models/User')
const tokenService = require('../service/tokenService')
const mailService = require('../service/mailService')

const registration = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send('Wrong data')
    }
    const { username, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(403).send('User with such an email exists')
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const activationLink = uuid.v4()
    const user = await User.create({ username, email, password: hashedPassword, activationLink })
    await mailService.sendActivationLink(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
    const token = tokenService.generateToken({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    return res.json({ token, userInfo: { id: user._id, img: user.img.url } })
})

const login = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send('Wrong data')
    }
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('User with such an email does not exist')
    }
    if (user.isBlocked) {
        return res.status(403).send('User is blocked')
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
        return res.status(400).send('Wrong password')
    }
    const token = tokenService.generateToken({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    return res.json({ token, userInfo: { id: user._id, img: user.img.url } })
})

const activate = asyncHandler(async (req, res, next) => {
    const activationLink = req.params.link
    const user = await User.findOne({ activationLink })
    if (!user) {
        return res.status(400).send('Wrong activation link')
    }
    user.isActivated = true
    await user.save()
    return res.redirect(`${process.env.CLIENT_URL}/main`)
})

const guestLogin = asyncHandler(async (req, res, next) => {
    const token = tokenService.generateToken({ id: 'guest', isAdmin: false, isActivated: false, isGuest: true })
    return res.json({ token })
})

module.exports = { registration, login, activate, guestLogin }