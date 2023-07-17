const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();



routes.post('/', (req, res) => {
    const Entry = req.body.entrydatetime; // Supondo que você esteja enviando entrada e saida no corpo da requisição
    const Exit = req.body.exitdatetime;
    const UserId = req.body.userid

    setschedule(Entry, Exit, UserId, res)
});


async function setschedule(Entry, Exit, UserId, res) {

    let sql = "INSERT INTO schedules (entrydatetime, exitdatetime, userid) VALUES('" + 
    Entry + 
    "', '" +
    Exit +
    "', '" +
    UserId +
    "')";
    
    dbase.query(sql, (error, result) => {
      if (error) {
        console.error('Erro ao adicionar horário:', error);
        res.sendStatus(500);
      } else {
        console.log('Horário adicionado com sucesso!');
        
        res.json('Horário adicionado com sucesso!')
      }
    });

}


module.exports = routes