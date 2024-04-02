const router = require('express').Router()
const ctrls = require('../controllers/room')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', verifyAccessToken, isAdmin, uploader.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]), ctrls.createRoom)
router.get('/', ctrls.getRooms)
router.get('/one/:rid', ctrls.getOneRoom)

module.exports = router