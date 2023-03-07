const express = require('express')
const uTodo = express.Router()
const jwt = require('jsonwebtoken')

uTodo.use( (req , res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token , process.env.TOKEN_SECRET , (err , user) => {
        if (err) return res.sendStatus(403);
        res.user = user
        next()
    })
})



uTodo.get('/', (req, res) => {    
    
    res.send('Hello from Todo')

})


module.exports = uTodo