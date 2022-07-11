const express = require('express')
const { getTags, getTagInfo } = require('../controllers/tagsControllers')

const router = express.Router()

router.get('/search', getTags)
router.get('/getInfo/:name/:userId', getTagInfo)

module.exports = router