const { Schema, model } = require('mongoose')

const tagModel = new Schema({
    name: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('Tag', tagModel)