const { Schema, model } = require('mongoose')

const commentModel = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('Comment', commentModel)