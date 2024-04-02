const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.put('/current', verifyAccessToken, uploader.single('avatar'), ctrls.updateUser)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.get('/admin', verifyAccessToken, isAdmin, ctrls.getUsers)
router.post('/admin', verifyAccessToken, isAdmin, ctrls.createUser)
router.put('/admin/:uid', verifyAccessToken, isAdmin, ctrls.updateUserByAdmin)
router.put('/room/:rid', verifyAccessToken, ctrls.registerForRoom)
router.delete('/admin/:uid', verifyAccessToken, isAdmin, ctrls.deleteUser)

module.exports = router
