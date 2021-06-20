 const mongoose = require('mongoose')

 const connectToDB = () => {
    mongoose.connect('mongodb://localhost:27017/todo-system', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.once('connected', () => {
        console.log('DB Connection Established Successfully')
    })
}

module.exports={connectToDB}