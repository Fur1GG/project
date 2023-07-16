const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();




routes.post('/', (req, res) => {
    let UserIdItem = req.body.userid
    console.log("userid",UserIdItem)

    console.log(UserIdItem,"testar")
    getItems(UserIdItem, res)

});


//funçao que vai buscar todos os materiais que se encontram requisitados pelo respetivo utilizador
async function getItems(UserIdItem, res) {
    let getItems = "SELECT * FROM inventory WHERE iduser = '"+ UserIdItem +"'";

    let GetItem = await new Promise((resolve, reject) => dbase.query(getItems, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            const requests = result
            res.json({requests})
        }
    }))


}




  
module.exports = routes