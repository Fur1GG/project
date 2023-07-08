const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.delete('/', (req, res) => {
    //Id of user
    //Gotten from token
    let ItemId = req.body.itemid;
    console.log("olaaa",ItemId)

    deleteusers(ItemId, res);
});


async function deleteusers(ItemId, res) {

    let DeleteItem = "DELETE FROM inventory WHERE id = '" + ItemId + "' ";
    let Getitem = await new Promise((resolve, reject) => dbase.query(DeleteItem, (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
            res.json("Item removido com sucesso")
        }
    }));

}






module.exports = routes