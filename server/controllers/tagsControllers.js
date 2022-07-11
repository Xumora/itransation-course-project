const asyncHandler = require('express-async-handler')
const Tag = require('../models/Tag')
const Item = require('../models/Item')
const User = require('../models/User')

const getTags = asyncHandler(async (req, res, next) => {
    const keyword = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {}
    const tags = await Tag.find(keyword).select('_id name')
    return res.json(tags)
})

const getTagInfo = asyncHandler(async (req, res, next) => {
    const { name, userId } = req.params
    const tag = await Tag.findOne({ name }).select('_id name')
    const items = await Item.find({ tags: { $regex: name, $options: 'i' } }).select('_id collectionId name img additionalFields likes tags createdAt')
        .populate({ path: 'collectionId', select: '_id name' }).populate({ path: 'user', select: '_id username img' }).sort({ createdAt: -1 })
    if (userId !== 'guest') {
        const user = await User.findById(userId)
        const isFollowed = user.followedTags.includes(name) ? true : false
        return res.json({ tag, items, isFollowed })
    } else if (userId === 'guest') {
        return res.json({ tag, items, isFollowed: false })
    }

})

module.exports = { getTags, getTagInfo }