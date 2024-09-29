
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://saifijaved616:Db_User_PassW0rd@cluster0.y38p8.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  // .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));



// require('dotenv').config()
// const mysql=require('mysql');
// const con=mysql.createConnection({
//     host:process.env.host,
//     user:process.env.user,
//     password:process.env.password,
//     database:process.env.database
// })

// con.connect((err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         // console.log("connected to the database")
//         // const queryStr="CREATE DATABASE IF NOT EXISTS angular"
//         // con.query(queryStr,(err)=>{
//         //     if(err){
//         //         console.log(err)
//         //     }
//         //     else{
//         //         console.log("database created sucessfully")
//         //     }
//         // })
//     }
// })

// module.exports=con
