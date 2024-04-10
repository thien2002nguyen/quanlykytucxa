const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.put('/current', verifyAccessToken, uploader.single('avatar'), ctrls.updateCurrent)
router.get('/manage', verifyAccessToken, ctrls.getUsers)
router.post('/manage', verifyAccessToken, ctrls.createUser)
router.put('/manage/:uid', verifyAccessToken, ctrls.updateUserByAdmin)
router.put('/room/:rid', verifyAccessToken, ctrls.registerForRoom)
router.delete('/manage/:uid', verifyAccessToken, ctrls.deleteUser)

module.exports = router
