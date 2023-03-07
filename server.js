const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const uroutes = require('./controller/userConfig')
const uTodo = require('./controller/todo')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, }))


app.use( '/' , uroutes)
app.use('/todo' , uTodo)


app.listen(8080, () => {
    console.log('Server is running on port 8080')
})