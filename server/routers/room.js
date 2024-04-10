const router = require('express').Router()
const ctrls = require('../controllers/room')
const uploader = require('../config/cloudinary.config')

router.get('/', ctrls.getRooms)
router.post('/manage', uploader.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]), ctrls.createRoom)
router.get('/one/:rid', ctrls.getOneRoom)

module.exports = router