const asyncHandler = require('express-async-handler')
const Comment = require('../models/Comment')
const Collection = require('../models/Collection')
const Item = require('../models/Item')

const addComment = asyncHandler(async (req, res, next) => {
    const { id, content, type } = req.body
    const user = req.user
    if (!user.isActivated) {
        return res.status(403).send('Email is not activated')
    }
    if (user.isGuest) {
        return res.status(403).send('User must register')
    }
    const comment = await Comment.create({ user: user.id, content })
    if (type === 'collection') {
        const collection = await Collection.findById(id)
        collection.comments.push(comment._id)
        collection.save()
    } else if (type === 'item') {
        const item = await Item.findById(id)
        item.comments.push(comment._id)
        item.save()
    }
    const commentData = await Comment.findById(comment._id).select('-updatedAt').populate({ path: 'user', select: '_id username img' })
    return res.json(commentData)
})

const getComments = asyncHandler(async (req, res, next) => {
    const { id, type } = req.params
    if (type === 'collection') {
        const collection = await Collection.findById(id).select('comments')
            .populate({ path: 'comments', select: '-updatedAt', options: { sort: { 'createdAt': -1 } }, populate: { path: 'user', select: '_id username img' } })
        return res.json(collection.comments)
    } else if (type === 'item') {
        const item = await Item.findById(id).select('comments')
            .populate({ path: 'comments', select: '-updatedAt', options: { sort: { 'createdAt': -1 } }, populate: { path: 'user', select: '_id username img' } })
        return res.json(item.comments)
    }
})

module.exports = { addComment, getComments }