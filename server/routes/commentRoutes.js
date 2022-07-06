const express = require('express')
const { addComment, getComments } = require('../controllers/commentControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.post('/add', verifyTokenMiddleware, addComment)
router.get('/get/:id/:type', getComments)

module.exports = router