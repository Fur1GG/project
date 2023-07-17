const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();

//definir rota para ir buscar os utilizadores
routes.post("/", async (req,res) => {

    let ID = req.body.id
    console.log("printa Id", ID)
    let value = ''
    //buscar users a base de dados
    let sql = "SELECT id, username, number, course, advisor, email, role FROM users WHERE role != '"+ value +"' AND id != '"+ ID +"'"

    let results = await new Promise((resolve, reject) =>{
        dbase.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
                const users = result
                res.json({users})
            }
        });
    });

    
})

module.exports = routes