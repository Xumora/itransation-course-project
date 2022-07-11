const express = require('express')
const { createItem, like, getItems, editItem, deleteItem } = require('../controllers/itemControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.post('/create', verifyTokenMiddleware, createItem)
router.post('/like', verifyTokenMiddleware, like)
router.post('/edit', verifyTokenMiddleware, editItem)
router.get('/search/:filter', getItems)
router.post('/delete', verifyTokenMiddleware, deleteItem)

module.exports = router