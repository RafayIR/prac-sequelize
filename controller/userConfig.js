const jwt = require('jsonwebtoken')
const express = require('express')
const { where } = require('sequelize')
const uroutes = express.Router()
const pool = require('../db/dbconfig')
const { User, Posts } = require('../Model/userModel')

uroutes.post('/signup', async (req, res) => {
    const { email, name, title } = req.body
    try {
        const username = await User.findOne({ where: { name: name } })
        if (username == null) {
            User.create({ email: email, name: name })
            Posts.create({ title: title })
            res.send('save successfull')
        } else {
            res.send('user already exist')
        }
    } catch (err) {
        console.log(err)
    }
})

uroutes.post('/signin', async (req, res) => {
    const { email, name } = req.headers
    const useremail = await User.findOne({ where: { email: email } })
    if (useremail == null) {
        res.status(401).json({ message: 'Invalid Email & Password' })
    } else if (useremail.name !== name) {
        res.status(401).json({ message: 'Invalid name' })
    } else {
        const token = generateAccessToken({ email: email })
        res.send(token)
    }
})

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '15m' })
}

uroutes.get('/', (req, res) => {

    // User.findOne( {
    //     where : {id : 1}
    // }).then( user => {
    //     Posts.create ( {
    //         title : 'my Special Book',
    //         UserId : user.id
    //     })
    // }).catch( err => {
    //     console.log(err)
    // })




    User.findAll(
        // {include: Posts}
    ).then(users => {
        const data = users.map((user) => {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                posts: user.posts
            }
        })

        res.send(data)

    })
        .catch(err => {
            console.log('Error getting user', err)
        })
})


module.exports = uroutes