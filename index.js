
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router  = require('./routes/router')
require('./database/dbConnection')

const userDetailsServer = express()

userDetailsServer.use(cors())
userDetailsServer.use(express.json())
userDetailsServer.use(router)

const PORT = 3000 || process.env.PORT

userDetailsServer.listen(PORT,()=>{
    console.log(`userDetailsServer started at ${PORT} and waiting for client request!!!`);
})

userDetailsServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">userDetailsServer started at port and waiting for client request!!!<h1>`)
})

