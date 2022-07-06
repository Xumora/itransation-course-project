const asyncHandler = require('express-async-handler')
const Collection = require('../models/Collection')
const Item = require('../models/Item')

const createItem = asyncHandler(async (req, res, next) => {
    const { collectionId, name, img, additionalFields } = req.body
    const user = req.user.id
    const collectionData = await Collection.findById(collectionId)
    if (collectionData.user != user) {
        return res.status(403).send('User has not access')
    }
    const item = await Item.create({ collectionId, name, img, additionalFields })
    collectionData.items.push(item._id)
    collectionData.itemsCount = collectionData.itemsCount + 1
    collectionData.save()
    return res.json(item)
})

const like = asyncHandler(async (req, res, nwxt) => {
    const { userId, itemId } = req.body
    const item = await Item.findById(itemId)
    if (item.likes.includes(userId)) {
        item.likes.splice(item.likes.indexOf(userId), 1)
        item.save()
        return res.json('Like is removed')
    } else {
        item.likes.push(userId)
        item.save()
        return res.json('Like is added')
    }
})

const getItems = asyncHandler(async (req, res, next) => {
    const keyword = req.query.search ? { $or: [{ name: { $regex: req.query.search, $options: 'i' } }, { tags: { $regex: req.query.search, $options: 'i' } }] } : {}
    const items = await Item.find(keyword)
    res.json(items)
})


module.exports = { createItem, like, getItems }