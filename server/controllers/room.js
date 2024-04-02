const Room = require('../models/room')
const asyncHandler = require('express-async-handler')

const createRoom = asyncHandler(async (req, res) => {
    const { numberRoom, numberPeople, price } = req.body
    if (!numberRoom, !numberPeople, !price) {
        throw new Error('Missing Inputs')
    }
    if (req.files?.thumb) {
        req.body.thumb = {
            filename: req.files?.thumb[0]?.filename,
            path: req.files?.thumb[0]?.path,
        }
    }
    if (req.files?.images) {
        req.body.images = req.files?.images?.map(element => {
            return {
                filename: element.filename,
                path: element.path
            }
        })
    }
    const response = await Room.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created room' : 'Somethings went wrong'
    })
})

const getOneRoom = asyncHandler(async (req, res) => {
    const { rid } = req.params
    const room = await Room.findById(rid).populate('users', 'name classStudy avatar')
    return res.status(200).json({
        success: room ? true : false,
        data: room ? room : 'Room not found'
    })
})

const getRooms = asyncHandler(async (req, res) => {
    const data = await Room.find().populate('users', 'name classStudy avatar')
    return res.status(200).json({
        success: data ? true : false,
        data: data ? data : 'Room not found'
    })
})

module.exports = {
    createRoom,
    getOneRoom,
    getRooms,
}