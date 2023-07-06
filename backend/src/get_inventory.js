const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();

//definir rota para ir buscar os utilizadores
routes.post("/", async (req,res) => {

    let Room = req.body.room 
    console.log("print Sala", Room)

    if(Room == 1){
        let sql = "SELECT id, objectname, quantity, room, state FROM inventory WHERE room = '" + Room + "'"

        let results = await new Promise((resolve, reject) =>{
            dbase.query(sql, (err, result) =>{
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                    const inv_room1 = result
                    res.json({inv_room1})
                }
            })
        })
    } else if(Room == 2){
        let sql = "SELECT id, objectname, quantity, room, state FROM inventory WHERE room = '" + Room + "'"

        let results = await new Promise((resolve, reject) =>{
            dbase.query(sql, (err, result) =>{
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                    const inv_room2 = result
                    res.json({inv_room2})
                }
            })
        })
    }

})

module.exports = routes;