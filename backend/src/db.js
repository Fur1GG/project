const mysql = require("mysql");
require('dotenv').config();



const dbase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

    dbase.connect( (error) => {
        if(error){
            console.log(error)
        }else{
            console.log("MYSQL Connected...")
        }
    })



module.exports = { dbase }