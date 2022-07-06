const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const User = require('../models/User')
const tokenService = require('../service/tokenService')
const mailService = require('../service/mailService')

const getUserInfo = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id).select('_id username email img bgImg followedTags collections bio website')
        .populate({ path: 'collections', select: '-updatedAt -items' })
    if (!user) {
        return res.status(400).send('There is no such user')
    }
    return res.json(user)
})

const editProfile = asyncHandler(async (req, res, next) => {
    const { username, email, password, bio, website, img, bgImg } = req.body
    const id = req.user.id
    const user = await User.findOneAndUpdate({ _id: id }, { username, bio, website, img, bgImg }, { new: true })
        .select('_id username email img bgImg bio website')
    if (user.email !== email) {
        user.isActivated = false
        user.email = email
        user.save()
        const activationLink = uuid.v4()
        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    }
    if (password.length > 7) {
        const hashedPassword = await bcrypt.hash(password, 12)
        user.password = hashedPassword
        user.save()
    }
    const tokens = tokenService.generateTokens({ id: user._id, isAdmin: user.isAdmin, isActivated: user.isActivated })
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 2592000 * 1000, httpOnly: true })
    return res.json({ user, token: tokens.accessToken })
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user
    if (user.isAdmin) {
        return res.json('User is admin')
    } else {
        return res.status(403).json('User is not admin')
    }
})

const getFollowers = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id).populate({ path: 'followers', select: '_id username img' })
    res.json(user.followers)
})

const getFollowings = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id).populate({ path: 'followings', select: '_id username img' })
    res.json(user.followings)
})

const getUsers = asyncHandler(async (req, res, next) => {
    const keyword = req.query.search ? { username: { $regex: req.query.search, $options: 'i' } } : {}
    const users = await User.find(keyword)
    res.json(users)
})

module.exports = { getUserInfo, editProfile, isAdmin, getFollowers, getFollowings, getUsers }