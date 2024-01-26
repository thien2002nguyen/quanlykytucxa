const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRouter = require('./routers')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}))
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dbConnect()
initRouter(app)

app.listen(port, () => {
    console.log('Server running on the port: ' + port);
})