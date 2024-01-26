const router = require('express').Router()
const ctrls = require('../controllers/student')
const { verifyAccessToken, isAdmin, isManage } = require('../middlewares/verifyToken')

router.post('/login', ctrls.login)
router.post('/create', ctrls.createStudent)
router.put('/current', verifyAccessToken, ctrls.updateStudent)
router.get('/current', verifyAccessToken, ctrls.getStudent)
router.post('/refresh', ctrls.refreshAccessToken)
router.delete('/', [verifyAccessToken, isManage], ctrls.deleteStudent)

module.exports = router
