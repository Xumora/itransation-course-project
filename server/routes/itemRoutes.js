const express = require('express')
const { createItem, like, getItems } = require('../controllers/itemControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.post('/create', verifyTokenMiddleware, createItem)
router.post('/like', like)
router.get('/search', getItems)

module.exports = router