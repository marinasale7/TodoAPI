const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publisher: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const TOdo = mongoose.model('todos', todoSchema)


module.exports = {
    TOdo
}