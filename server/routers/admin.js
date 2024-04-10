const router = require('express').Router()
const ctrls = require('../controllers/admin')

router.post('/manage', ctrls.createAdmin)

module.exports = router