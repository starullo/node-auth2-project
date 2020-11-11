const server = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || 4445;

server.listen(PORT, (req, res, next)=>{
    console.log('all good on port ' + PORT)
})