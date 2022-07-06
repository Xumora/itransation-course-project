const { Schema, model } = require('mongoose')

const userModel = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: Object, default: { url: 'https://res.cloudinary.com/xumora/image/upload/v1655992787/test/recp6hkjjvvkopjwqcy7.png', public_id: null } },
    bgImg: { type: Object, default: { url: 'https://res.cloudinary.com/xumora/image/upload/v1655993407/test/qtp1kx4j9tgnvcr7ehlr.jpg', public_id: null } },
    isActivated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
    followedTags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bio: { type: String },
    website: { type: String }
}, {
    timestamps: true
})

module.exports = model('User', userModel)