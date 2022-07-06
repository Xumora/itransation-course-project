const { Schema, model } = require('mongoose')

const collectionModel = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    img: { type: Object, default: null },
    itemFields: { type: Array, default: [] },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Array, default: [] },
    viewed: { type: Number, default: 0 },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    itemsCount: { type: Number, default: 0 }
}, {
    timestamps: true
})

module.exports = model('Collection', collectionModel)