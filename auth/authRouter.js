const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/config');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = express.Router();

const verifyNewUser = async (req, res, next)=>{
    const [user] = await db('users').where({username: req.body.username});

    if (!req.body.username || !req.body.password) {
        next({code: 400, message: 'username and password are required fields'})
        res.status(500).json({message: 'fuck you'})
    } else if (user) {
        next({code: 400, message: 'username already exists'})
        res.status(500).json({message: 'fuck you'})
    } else {
        next();
    }
}


router.post('/register', verifyNewUser, (req, res, next)=>{
    const {username, password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const newUser = {username, password: hash, department: req.body.department};
    db('users').insert(newUser)
    .then(data=>{
        return db('users').where({id: data})
    })
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })
})

router.post('/login', async (req, res, next)=>{
    try {
        const {username, password} = req.body;
        const [user] = await db('users').where({username})
        if (!user) {
            res.status(401).json({
                message: 'invalid username'
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            res.status(401).json({
                message: 'incorrect password'
            })
        }

        const token = jwt.sign({
            userId: user.id,
            userRole: 'admin'
        }, process.env.SECRETSTRING)

        res.status(200).json({
            message: 'welcome back ' + user.username,
            token
        })

    } catch (err) {
        next({code: 500, message: err.message})
    }
})

router.use((err, req, res, next)=>{
    res.status(err.code).json({message: err.message});
})

module.exports = router;