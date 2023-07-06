const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


//definir rota para ir buscar os utilizadores novos
routes.post("/", async (req,res) => {

    let State = req.body.state
    console.log(State)

    //condição para ir buscar os utilizadores sem role
    if (State == 1){    
        let value = ''
        console.log(value)
        //buscar utilizadores sem role á base de dados
        let sql = "SELECT id, username, number, email, role FROM users WHERE role = '" + value + "'";


        let results = await new Promise((resolve, reject) => {
            dbase.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    const users = result
                    res.json({users})
                }
            })
        })
    }

    //condição para ir buscar os utilizadores com a role professor e admin
    if(State == 2){
        let Value1 = 'professor'
        let Value2 = 'admin'
        
        let sql = "SELECT id, username, number, email, role FROM users WHERE role = '" + Value1 + "' OR role = '" + Value2 + "'"

        let results = await new Promise((resolve, reject) => {
            dbase.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                    const profs = result
                    res.json({profs})
                }
            })
        })
    }
})

module.exports = routes