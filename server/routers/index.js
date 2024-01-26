const userRouter = require('./student')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRouter = (app) => {
    app.use('/api/student', userRouter)
    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRouter