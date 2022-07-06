const asyncHandler = require('express-async-handler')
const Comment = require('../models/Comment')
const Collection = require('../models/Collection')
const Item = require('../models/Item')

const addComment = asyncHandler(async (req, res, next) => {
    const { id, content, type } = req.body
    const user = req.user.id
    const comment = await Comment.create({ user, content })
    if (type === 'collection') {
        const collection = await Collection.findById(id)
        collection.comments.push(comment._id)
        collection.save()
    } else if (type === 'item') {
        const item = await Item.findById(id)
        item.comments.push(comment._id)
        item.save()
    }
    return res.json(comment)
})

const getComments = asyncHandler(async (req, res, next) => {
    const { id, type } = req.params
    if (type === 'collection') {
        const collection = await Collection.findById(id).populate({ path: 'comments', select: '-updatedAt', populate: { path: 'user', select: '_id username img' } })
        return res.json(collection.comments)
    } else if (type === 'item') {
        const item = await Item.findById(id).populate({ path: 'comments', select: '-updatedAt', populate: { path: 'user', select: '_id username img' } })
        return res.json(item.comments)
    }
})

module.exports = { addComment, getComments }