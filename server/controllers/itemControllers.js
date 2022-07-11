const asyncHandler = require('express-async-handler')
const Collection = require('../models/Collection')
const Item = require('../models/Item')
const Tag = require('../models/Tag')
const Comment = require('../models/Comment')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


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

const deleteItem = asyncHandler(async (req, res, next) => {
    const { id } = req.body
    const user = req.user
    const item = await Item.findById(id)
    if (user.id == item.user || user.isAdmin) {
        if (item.img) {
            cloudinary.v2.uploader.destroy(item.img.public_id, async (err, result) => {
                if (err) throw err
            })
        }
        await Comment.deleteMany({ _id: item.comments })
        await Item.deleteOne({ _id: id })
        return res.json('Item is deleted')
    }
})

module.exports = { createItem, like, editItem, getItems, deleteItem }