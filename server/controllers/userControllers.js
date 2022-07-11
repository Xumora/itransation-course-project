const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const tokenService = require('../service/tokenService')
const mailService = require('../service/mailService')
const cloudinary = require('cloudinary')

const User = require('../models/User')
const Comment = require('../models/Comment')
const Collection = require('../models/Collection')
const Item = require('../models/Item')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const getUserInfo = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id).select('_id username email img bgImg followedTags collections bio website')
        .populate({ path: 'collections', select: '-comments -items -updatedAt', populate: { path: 'user', select: '_id' }, options: { sort: { 'createdAt': -1 } } })
    if (!user) {
        return res.status(400).send('There is no such user')
    }
    return res.json(user)
})

const editProfile = asyncHandler(async (req, res, next) => {
    const { username, email, password, bio, website, img, bgImg } = req.body
    const userInfo = req.user
    if (userInfo.isGuest) {
        return res.status(403).send('User must register')
    }
    const user = await User.findOneAndUpdate({ _id: userInfo.id }, { username, bio, website, img, bgImg }, { new: true })
        .select('_id username email img bgImg bio website isActivated')
    if (user.email !== email) {
        user.isActivated = false
        user.email = email
        const activationLink = uuid.v4()
        user.activationLink = activationLink
        user.save()
        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
    }
    if (password.length > 7) {
        const hashedPassword = await bcrypt.hash(password, 12)
        user.password = hashedPassword
        user.save()
    }
    const token = tokenService.generateToken({ id: userInfo.id, isAdmin: userInfo.isAdmin, isActivated: user.isActivated })
    return res.json({ user, token })
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user
    if (user.isAdmin) {
        return res.json('User is admin')
    } else {
        return res.status(403).json('User is not admin')
    }
})

const getUsers = asyncHandler(async (req, res, next) => {
    const keyword = req.query.search ? { username: { $regex: req.query.search, $options: 'i' } } : {}
    const users = await User.find(keyword).select('_id username img isAdmin email isBlocked')
    res.json(users)
})

const tagFollow = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    const userData = req.user
    if (!userData.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (userData.isGuest) {
        return res.status(403).send('User must register')
    }
    const user = await User.findById(userData.id)
    if (user.followedTags.includes(name)) {
        user.followedTags.splice(user.followedTags.indexOf(name), 1)
        user.save()
        return res.json('Tag is unfollowed')
    } else {
        user.followedTags.push(name)
        user.save()
        return res.json('Tag is followed')
    }
})

const blockUsers = asyncHandler(async (req, res, next) => {
    const { users, block } = req.body
    const user = req.user
    if (!user.isAdmin || user.isGuest) {
        return res.status(403).send('User has not access')
    }
    if (block) {
        await User.updateMany({ _id: users }, { isBlocked: true })
        return res.json('Users are blocked')
    } else {
        await User.updateMany({ _id: users }, { isBlocked: false })
        return res.json('Users are unblocked')
    }
})

const deleteUsers = asyncHandler(async (req, res, next) => {
    const { users } = req.body
    const user = req.user
    if (!user.isAdmin || user.isGuest) {
        return res.status(403).send('User has not access')
    }
    const dbUsers = await User.find({ _id: users })
    dbUsers.map(async v => {
        cloudinary.v2.uploader.destroy(v.img.public_id, async (err, result) => {
            if (err) throw err
        })
        cloudinary.v2.uploader.destroy(v.bgImg.public_id, async (err, result) => {
            if (err) throw err
        })
        await Collection.deleteMany({ user: v._id })
        await Comment.deleteMany({ user: v._id })
        await Item.deleteMany({ user: v._id })
    })
    await User.deleteMany({ _id: users })
    return res.json('Users are deleted')
})

const changeRole = asyncHandler(async (req, res, next) => {
    const { users, admin } = req.body
    const user = req.user
    if (!user.isAdmin || user.isGuest) {
        return res.status(403).send('User has not access')
    }
    if (admin) {
        await User.updateMany({ _id: users }, { isAdmin: true })
    } else {
        await User.updateMany({ _id: users }, { isAdmin: false })
    }
    return res.json('Role is changed')
})

module.exports = { getUserInfo, editProfile, isAdmin, getUsers, tagFollow, blockUsers, deleteUsers, changeRole }