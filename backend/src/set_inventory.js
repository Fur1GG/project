const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.put('/', (req, res) => {
    let Objectname = req.body.objectname
    let Quantity = req.body.quantity
    let Room = req.body.room
    let State = true

    console.log("oluuu", Objectname)

    setinventory(Objectname, Quantity, Room, State, res)
});

async function setinventory(Objectname, Quantity, Room, State, res) {
    let sqlSetInv = "INSERT INTO inventory (objectname, quantity, room, state) VALUES('"+ 
    Objectname + 
    "', '" +
    Quantity +
    "', '" +
    Room +
    "', '" +
    State +
    "')";

    dbase.query(sqlSetInv, (err, result) => {
        if(err) throw err;
        console.log("Value Added To DataBase");
        res.json("Material adicionado");
    })
}





module.exports = routes