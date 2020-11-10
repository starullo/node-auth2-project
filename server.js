const express = require('express');

const server = express();

server.use(express.json());

server.get('/test', (req, res, next)=>{
    res.json({message: 'affirmative'});
})

module.exports = server;