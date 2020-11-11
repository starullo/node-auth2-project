const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../data/config')

const router = express.Router();

router.get('/', (req, res, next)=>{
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({message: 'must be logged in to do that'})
    }

    jwt.verify(token, process.env.SECRETSTRING, (err, decoded)=>{
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            db('users')
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                res.status(500).json({message: err.message})
            })
        }
    })

})

module.exports = router;