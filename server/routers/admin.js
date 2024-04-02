const router = require('express').Router()
const ctrls = require('../controllers/admin')

router.post('/', ctrls.createAdmin)

module.exports = router