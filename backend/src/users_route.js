const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();

//definir rota para ir buscar os utilizadores
routes.get("/", async (req,res) => {

    //buscar users á base de dados
    let sql = "SELECT username, email, role FROM users"

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