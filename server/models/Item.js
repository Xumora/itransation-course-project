const { Schema, model } = require('mongoose')

const itemModel = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection' },
    name: { type: String, required: true },
    img: { type: Object, default: null },
    additionalFields: { type: Array, default: [] },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Array, default: [] },
    tags: { type: Array, default: [] }
}, {
    timestamps: true
})

module.exports = model('Item', itemModel)