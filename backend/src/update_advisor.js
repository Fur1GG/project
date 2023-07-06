const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.put('/', (req, res) => {
    let Advisor = req.body.advisor
    let UserId = req.body.userid
    console.log("oluuu", Advisor)

    updateusers(Advisor, UserId, res)
});

async function updateusers(Advisor, UserId, res) {
    let UpdateUser = "UPDATE users SET advisor = '" + Advisor +"' WHERE Id = '" + UserId + "'";

    let GetUser = await new Promise((resolve, reject) => dbase.query(UpdateUser, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            res.json(result);
        }
    }))
}





module.exports = routes