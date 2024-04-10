const router = require('express').Router()
const ctrls = require('../controllers/user')
const uploader = require('../config/cloudinary.config')

router.put('/current', uploader.single('avatar'), ctrls.updateUser)
router.get('/current', ctrls.getCurrent)
router.get('/manage', ctrls.getUsers)
router.post('/manage', ctrls.createUser)
router.put('/manage/:uid', ctrls.updateUserByAdmin)
router.put('/room/:rid', ctrls.registerForRoom)
router.delete('/manage/:uid', ctrls.deleteUser)

module.exports = router
