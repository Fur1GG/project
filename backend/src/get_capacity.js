const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();
const moment = require('moment-timezone');

//definir rota para ir buscar os utilizadores
routes.get("/", async (req,res) => {
    const currentDateTime = moment().tz('Europe/Lisbon').format('YYYY-MM-DD HH:mm:ss');

    stored_entrydate = []
    stored_exitdate = []

    let limit;
    let count = 0

    let sql = "SELECT entrydatetime, exitdatetime FROM schedules "

    let results = await new Promise((resolve, reject) =>{
        dbase.query(sql, (err, result) =>{
            if(err) {
                reject(err)
            } else {
                resolve(result)
                limit = result.length;
                for (let i = 0; i < limit; i++) {
                    const entryDateTime = moment(result[i].entrydatetime).tz('Europe/Lisbon').format('YYYY-MM-DD HH:mm:ss');
                    const exitDateTime = moment(result[i].exitdatetime).tz('Europe/Lisbon').format('YYYY-MM-DD HH:mm:ss');
                    stored_entrydate.push(entryDateTime);
                    stored_exitdate.push(exitDateTime);

                    if (moment(currentDateTime).isBetween(stored_entrydate[i], stored_exitdate[i])) {
                        count = count+ 1;
                    }

                }
                console.log(currentDateTime)
                console.log(stored_entrydate)
                console.log(stored_exitdate)
                res.json(count)
            }
         })
    })




})

async function getDB() {

}

module.exports = routes;