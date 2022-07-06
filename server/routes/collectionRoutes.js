const express = require('express')
const { createCollection, getCollectionInfo, like, editCollection, getCollections } = require('../controllers/collectionControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.post('/create', verifyTokenMiddleware, createCollection)
router.get('/getInfo/:id', getCollectionInfo)
router.post('/like', like)
router.post('/edit', verifyTokenMiddleware, editCollection)
router.get('/search', getCollections)


module.exports = router