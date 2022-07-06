const express = require('express')
const { uploadImg, deleteImg } = require('../controllers/imageControllers')

const router = express.Router()

router.post('/upload', uploadImg)
router.post('/delete', deleteImg)

module.exports = router