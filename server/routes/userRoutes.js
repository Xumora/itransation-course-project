const express = require('express')
const { getUserInfo, isAdmin, editProfile, getUsers, tagFollow, blockUsers, deleteUsers, changeRole } = require('../controllers/userControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.get('/getInfo/:id', getUserInfo)
router.post('/edit', verifyTokenMiddleware, editProfile)
router.get('/isAdmin', verifyTokenMiddleware, isAdmin)
router.get('/search', getUsers)
router.post('/tagFollow', verifyTokenMiddleware, tagFollow)
router.post('/block', verifyTokenMiddleware, blockUsers)
router.post('/delete', verifyTokenMiddleware, deleteUsers)
router.post('/changeRole', verifyTokenMiddleware, changeRole)

module.exports = router