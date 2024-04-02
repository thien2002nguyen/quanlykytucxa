const userRouter = require('./user')
const accountRouter = require('./account')
const adminRouter = require('./admin')
const roomRouter = require('./room')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRouter = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/account', accountRouter)
    app.use('/api/admin', adminRouter)
    app.use('/api/room', roomRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouter