const asyncHandler = require('express-async-handler')
const Collection = require('../models/Collection')
const User = require('../models/User')

const createCollection = asyncHandler(async (req, res, next) => {
    const { userId, name, description, img, itemFields } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    if (user.isAdmin) {
        const userData = await User.findById(userId)
        const collection = await Collection.create({ user: userId, name, description, img, itemFields })
        userData.collections.push(collection._id)
        userData.save()
        return res.json('Collection is created')
    } else {
        const userData = await User.findById(user.id)
        const collection = await Collection.create({ user: user.id, name, description, img, itemFields })
        userData.collections.push(collection._id)
        userData.save()
        return res.json('Collection is created')
    }
})

const getCollectionInfo = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const collection = await Collection.findById(id).select('user name itemFields items itemsCount')
        .populate({ path: 'user', select: '_id username img' })
        .populate({ path: 'items', select: '_id name img additionalFields likes tags createdAt', options: { sort: { 'createdAt': -1 } } })
    return res.json(collection)
})

const like = asyncHandler(async (req, res, next) => {
    const { collectionId } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const collection = await Collection.findById(collectionId)
    if (collection.likes.includes(user.id)) {
        collection.likes.splice(collection.likes.indexOf(user.id), 1)
        collection.save()
        return res.json('Like is removed')
    } else {
        collection.likes.push(user.id)
        collection.save()
        return res.json('Like is added')
    }
})

const editCollection = asyncHandler(async (req, res, next) => {
    const { userId, id, name, description, img, itemFields } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const collection = await Collection.findById(id).populate({ path: 'user', select: '_id' })
    if (collection.user._id == userId || user.isAdmin) {
        collection.name = name
        collection.description = description
        collection.img = img
        collection.itemFields = itemFields
        collection.save()
        return res.json('Collection is updated')
    } else {
        return res.status(403).send('User has not access')
    }
})

const getCollections = asyncHandler(async (req, res, next) => {
    const { filter } = req.params
    const keyword = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {}
    let collections = []
    if (filter === 'Date') {
        collections = await Collection.find(keyword).select('-itemFields -comments -items -updatedAt')
            .populate({ path: 'user', select: '_id username img' }).sort({ createdAt: -1 })
    } else if (filter === 'Alphabet') {
        collections = await Collection.find(keyword).select('-itemFields -comments -items -updatedAt')
            .populate({ path: 'user', select: '_id username img' }).sort({ name: 1 })
    } else if (filter === 'Items count') {
        collections = await Collection.find(keyword).select('-itemFields -comments -items -updatedAt')
            .populate({ path: 'user', select: '_id username img' }).sort({ itemsCount: -1 })
    }
    return res.json(collections)
})

module.exports = { createCollection, getCollectionInfo, like, editCollection, getCollections }