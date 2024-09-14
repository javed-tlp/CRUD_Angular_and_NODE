require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.port;
const bodyParser=require('body-parser')
const cors=require('cors')

///////cors///////
app.use(cors())

////////// body parser//////////
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/////////importing db connecting config/////////
require('./config/db_con')


///////// express router////////
const router=require('./routes/user_routes')
app.use('/user',router)


app.listen(port, ()=>{
    console.log(`server is live on port ${port}`)
    console.log(`http://localhost:${port}`)
})

