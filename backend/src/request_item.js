const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();




routes.put('/', (req, res) => {
    let ItemId = req.body.itemid
    let UserIdItem = req.body.userid
    let State = 'false'
    console.log("ItemId",ItemId)
    console.log("userid",UserIdItem)


    checkupdatestate(UserIdItem, State, ItemId, res)

});

async function checkupdatestate(UserIdItem, State, ItemId, res) {
    //ir buscar o state á base de dados para verificar se o material se encontra requisitado
    let sql1 = "SELECT state FROM inventory WHERE id ='"+ItemId+"'"
    let storedItemstate = 0

    let results = await new Promise((resolve, reject) =>
    dbase.query(sql1, (err, result) =>{
        if (err) {
            reject(err);
            console.log("erro")
        } else {
            resolve(result);
            console.log(result)
            //armazenar valor na variavel
            storedItemstate = result[0].state
            console.log(storedItemstate,"olii")
        }
    }))

    //condição que verifica a disponibilidade do material
    if(storedItemstate == 'true'){
        updateState(State, UserIdItem, ItemId, res)
    }else {
        res.json("O material já se encontra requisitado")
    }
}

//funçao que vai dar set ao state do material
async function updateState(State, UserIdItem, ItemId, res) {
    let UpdateState = "UPDATE inventory SET state = '" + State +"', iduser = '" + UserIdItem +"' WHERE id = '" + ItemId + "'";

    let GetItem = await new Promise((resolve, reject) => dbase.query(UpdateState, (err, result) => {
        if(err) {
            reject(err);
        } else {
            resolve(result);
            res.json("Item requisitado com sucesso")
        }
    }))


}




  
module.exports = routes