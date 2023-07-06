const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.delete('/', (req, res) => {
    //Id of user
    //Gotten from token
    let UserId = req.body.userid;
    console.log("olaaa",UserId)

    deleteusers(UserId, res);
});


async function deleteusers(UserId, res) {

    let DeleteUser = "DELETE FROM users WHERE Id = '" + UserId + "' ";
    let GetUser = await new Promise((resolve, reject) => dbase.query(DeleteUser, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
            res.json(result)
        }
    }));

}






module.exports = routes