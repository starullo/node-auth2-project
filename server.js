const express = require('express');
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');

const server = express();

server.use(express.json());
server.use('/users', usersRouter);
server.use('/auth', authRouter)

server.get('/test', (req, res, next)=>{
    res.json({message: 'affirmative'})
})

module.exports = server;