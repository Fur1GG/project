const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();




routes.put('/', (req, res) => {
    let ItemId = req.body.itemid
    let UserIdItem = 0
    let State = 'true'
    console.log("ItemId",ItemId)
    console.log("userid",UserIdItem)


    updateState(State, UserIdItem, ItemId, res)

});


//funçao que vai dar set ao state do material
async function updateState(State, UserIdItem, ItemId, res) {
    let UpdateState = "UPDATE inventory SET state = '" + State +"', iduser = '" + UserIdItem +"' WHERE id = '" + ItemId + "'";

    let GetItem = await new Promise((resolve, reject) => dbase.query(UpdateState, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            res.json("Item entregue com sucesso")
        }
    }))


}




  
module.exports = routes