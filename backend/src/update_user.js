const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.put('/', (req, res) => {
    let Role = req.body.role
    let UserId = req.body.userid
    console.log("oleeeee", Role, UserId)

    updateusers(Role, UserId, res)
});

async function updateusers(Role, UserId, res) {
    let UpdateUser = "UPDATE users SET role = '" + Role +"' WHERE Id = '" + UserId + "'";

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