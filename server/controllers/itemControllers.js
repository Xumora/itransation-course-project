const asyncHandler = require('express-async-handler')
const Collection = require('../models/Collection')
const Item = require('../models/Item')
const Tag = require('../models/Tag')

const createItem = asyncHandler(async (req, res, next) => {
    const { collectionId, name, img, additionalFields, tags } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const collectionData = await Collection.findById(collectionId).populate({ path: 'user', select: '_id' })
    if (collectionData.user._id == user.id || user.isAdmin) {
        tags.map(async v => {
            const isTagExists = await Tag.findOne({ name: v })
            if (!isTagExists) {
                await Tag.create({ name: v })
            }
        })
        const item = await Item.create({ user: collectionData.user._id, collectionId, name, img, additionalFields, tags })
        collectionData.items.push(item._id)
        collectionData.itemsCount = collectionData.itemsCount + 1
        collectionData.save()
        return res.json('Item is created')
    }
})

const editItem = asyncHandler(async (req, res, next) => {
    const { id, name, img, additionalFields, tags } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const item = await Item.findById(id).populate({ path: 'user', select: '_id' })
    if (item.user._id == user.id || user.isAdmin) {
        await Item.findOneAndUpdate({ _id: id }, { name, img, additionalFields, tags }, { new: true })
            .select('_id collectionId name img additionalFields likes tags createdAt').populate({ path: 'collectionId', select: '_id name' })
        return res.json('Item is updated')
    }
})

const like = asyncHandler(async (req, res, next) => {
    const { itemId } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const item = await Item.findById(itemId)
    if (item.likes.includes(user.id)) {
        item.likes.splice(item.likes.indexOf(user.id), 1)
        item.save()
        return res.json('Like is removed')
    } else {
        item.likes.push(user.id)
        item.save()
        return res.json('Like is added')
    }
})

const getItems = asyncHandler(async (req, res, next) => {
    const { filter } = req.params
    const keyword = req.query.search ? { $or: [{ name: { $regex: req.query.search, $options: 'i' } }, { tags: { $regex: req.query.search, $options: 'i' } }] } : {}
    let items = []
    if (filter === 'Date') {
        items = await Item.find(keyword).select('_id user collectionId name img additionalFields likes tags createdAt')
            .populate({ path: 'user', select: '_id username img' })
            .populate({ path: 'collectionId', select: '_id name' }).sort({ createdAt: -1 })
    } else if (filter === 'Alphabet') {
        items = await Item.find(keyword).select('_id user collectionId name img additionalFields likes tags createdAt')
            .populate({ path: 'user', select: '_id username img' })
            .populate({ path: 'collectionId', select: '_id name' }).sort({ name: 1 })
    }
    return res.json(items)
})


module.exports = { createItem, like, editItem, getItems }