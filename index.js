// loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

// create an express application
const empDoxServer = express()
empDoxServer.use(cors())
empDoxServer.use(express.json())
empDoxServer.use(router)
empDoxServer.use('/uploads', express.static('./Uploads'));
const PORT = 4000 || process.env.PORT

empDoxServer.listen(PORT,()=>{
    console.log(`empDoxServer started at port : ${PORT} and waiting for request...`);
})

// http get request resolving to http://localhost:4000/
empDoxServer.get('/',(req,res)=>{
    res.send(`EmpDox Server started and waiting for request...`)
})