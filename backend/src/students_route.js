const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();

routes.post("/", async (req, res) => {
    let Advisor = req.body.advisor
    console.log(Advisor)
    let sql = "SELECT id, username, number, course, email FROM users WHERE advisor = '" + Advisor + "'";

    let results = await new Promise((resolve, reject) => {
        dbase.query(sql, (err, result) => {
            if(err) {
                reject(err)
            } else{
                resolve(result)
                const students = result 
                res.json({students})
            }
        })
    })
})

module.exports = routes