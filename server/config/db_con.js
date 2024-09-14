require('dotenv').config()
const mysql=require('mysql');
const con=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

con.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("connected to the database")
        // const queryStr="CREATE DATABASE IF NOT EXISTS angular"
        // con.query(queryStr,(err)=>{
        //     if(err){
        //         console.log(err)
        //     }
        //     else{
        //         console.log("database created sucessfully")
        //     }
        // })
    }
})

module.exports=con
