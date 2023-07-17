const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();




routes.post('/', (req, res) => {
    let UserId = req.body.userid
    console.log("userid",UserId)

    console.log(UserId,"testar")
    getItems(UserId, res)

});


//funçao que vai buscar todos os horáqrios que se encontram requisitados pelo respetivo utilizador
async function getItems(UserId, res) {
    let getSchedule = "SELECT * FROM schedules WHERE userid = '"+ UserId +"'";

    let GetSchedule = await new Promise((resolve, reject) => dbase.query(getSchedule, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            const schedules = result
            res.json({schedules})
        }
    }))


}




  
module.exports = routes