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
    const user = await User.create({ username, email, password: hashedPassword })
    await mailService.sendActivationLink(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    const tokens = tokenService.generateTokens({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 2592000 * 1000, httpOnly: true })
    return res.json({ token: tokens.accessToken, userInfo: { id: user._id, img: user.img.url } })
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
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
        return res.status(400).send('Wrong password')
    }
    const tokens = tokenService.generateTokens({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 2592000 * 1000, httpOnly: true })
    return res.json({ token: tokens.accessToken, userInfo: { id: user._id, img: user.img.url } })
})

const logout = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies
    if (refreshToken) {
        res.clearCookie('refreshToken')
        return res.json({ success: true })
    }
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

const refresh = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.json({ succes: false, message: 'User is not authorized' })
    }
    const tokenData = tokenService.validateRefreshToken(refreshToken)
    if (!tokenData) {
        return res.json({ success: false, message: 'User is not authorized' })
    }
    const user = await User.findById(tokenData.id)
    const tokens = tokenService.generateTokens({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 2592000 * 1000, httpOnly: true })
})

module.exports = { registration, login, logout, activate, refresh }