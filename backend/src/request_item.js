const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();




//editarrrrrrr
routes.put('/', (req, res) => {
    let ItemId = req.body.itemid
    let UserIdItem = req.body.useriditem
    let State = false
    console.log("oluuu")


    checkupdatestate(UserIdItem, State, ItemId, res)

});

async function checkupdatestate(UserIdItem, State, ItemId, res) {
    let sql1 = "SELECT iduser FROM inventory WHERE id ='"+ItemId+"'"
    let storedItemiduser = 0

    let results = await new Promise((resolve, reject) =>
    dbase.query(sql1, (err, result) =>{
        if (err) {
            reject(err);
            console.log("erro")
        } else {
            resolve(result);
            console.log(result)
            //armazenar valor na variavel
            storedItemiduser = result[0].iduser
            console.log(storedItemiduser,"olii")
        }
    }))

    if(storedItemiduser == 0){
        updateState(State, UserIdItem, ItemId, res)
    }else {
        res.json("O material já se encontra requisitado")
    }
}

async function updateState(State, UserIdItem, ItemId, res) {
    let UpdateState = "UPDATE inventory SET state = '" + State +"', iduser = '" + UserIdItem +"' WHERE id = '" + ItemId + "'";

    let GetItem = await new Promise((resolve, reject) => dbase.query(UpdateState, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            res.json(result);
        }
    }))


}




  
module.exports = routes