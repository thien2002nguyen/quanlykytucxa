const router = require('express').Router()
const ctrls = require('../controllers/insert')

router.post('/user', ctrls.insertUsers)
router.post('/admin', ctrls.insertAdmins)

module.exports = router