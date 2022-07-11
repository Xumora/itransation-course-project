const express = require('express')
const { createCollection, getCollectionInfo, like, editCollection, getCollections, deleteCollection } = require('../controllers/collectionControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.post('/create', verifyTokenMiddleware, createCollection)
router.get('/getInfo/:id', getCollectionInfo)
router.post('/like', verifyTokenMiddleware, like)
router.post('/edit', verifyTokenMiddleware, editCollection)
router.get('/search/:filter', getCollections)
router.post('/delete', verifyTokenMiddleware, deleteCollection)


module.exports = router