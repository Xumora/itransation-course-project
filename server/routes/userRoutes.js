const express = require('express')
const { getUserInfo, isAdmin, editProfile, getFollowers, getFollowings, getUsers } = require('../controllers/userControllers')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware')

const router = express.Router()

router.get('/getInfo/:id', getUserInfo)
router.post('/edit', verifyTokenMiddleware, editProfile)
router.get('/isAdmin', verifyTokenMiddleware, isAdmin)
router.get('/followers/:id', getFollowers)
router.get('/followings/:id', getFollowings)
router.get('/search', getUsers)

module.exports = router