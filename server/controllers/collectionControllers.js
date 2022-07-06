const asyncHandler = require('express-async-handler')
const Collection = require('../models/Collection')
const User = require('../models/User')

const createCollection = asyncHandler(async (req, res, next) => {
    const { name, description, img, itemFields } = req.body
    const user = req.user.id
    const userData = await User.findById(user)
    const collection = await Collection.create({ user, name, description, img, itemFields })
    userData.collections.push(collection._id)
    userData.save()
    return res.json(collection)
})

const getCollectionInfo = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const collection = await Collection.findById(id).select('-updatedAt').
        populate({ path: 'user', select: '_id username img' }).populate({ path: 'items', select: '-updatedAt', populate: { path: 'collectionId', select: '_id name' } })
    return res.json(collection)
})

const like = asyncHandler(async (req, res, next) => {
    const { userId, collectionId } = req.body
    const collection = await Collection.findById(collectionId)
    if (collection.likes.includes(userId)) {
        collection.likes.splice(collection.likes.indexOf(userId), 1)
        collection.save()
        return res.json('Like is removed')
    } else {
        collection.likes.push(userId)
        collection.save()
        return res.json('Like is added')
    }
})

const editCollection = asyncHandler(async (req, res, next) => {
    const { id, name, description, img, itemFields } = req.body
    const userId = req.user.id
    const collection = await Collection.findById(id).populate({ path: 'user', select: '_id' })
    if (collection.user._id == userId) {
        collection.name = name
        collection.description = description
        collection.img = img
        collection.itemFields = itemFields
        collection.save()
        return res.json(collection)
    } else {
        return res.status(403).send('User is not owner')
    }
})

const getCollections = asyncHandler(async (req, res, next) => {
    const keyword = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {}
    const collections = await Collection.find(keyword)
    res.json(collections)
})

module.exports = { createCollection, getCollectionInfo, like, editCollection, getCollections }