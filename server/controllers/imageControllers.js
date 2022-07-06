const asyncHandler = require('express-async-handler')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadImg = asyncHandler(async (req, res, next) => {
    const img = req.files.file
    cloudinary.v2.uploader.upload(img.tempFilePath, { folder: "test" }, async (err, result) => {
        if (err) throw err
        res.json({ public_id: result.public_id, url: result.secure_url })
    })
})

const deleteImg = asyncHandler(async (req, res, next) => {
    const { public_id } = req.body
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err
        res.json({ msg: "Image Deleted" })
    })
})

module.exports = { uploadImg, deleteImg }