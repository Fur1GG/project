const {dbase} = require("./db.js")
const express = require('express');
const bcrypt = require("bcrypt");
const routes = express.Router();


// define uma rota para inserir valores na base de dados
routes.post("/", async (req,res) =>{
  // vai buscar os valores enviados pelo cliente
  let User = req.body.name;
  let Email = req.body.email;
  let Password = req.body.password;
  let NumberId = req.body.numberId
  let Course = req.body.course
  console.log("Nome:", User)
  console.log("Email:", Email)
  console.log("Password:", Password)
  let Insert = insertDB(User, Email, Password, NumberId, Course, res);

  Insert.then(function () {
    console.log("Successeful execution of request");
  }).catch(function () {
    console.log("Something went wrong...")
  })

})

async function insertDB(name, email, password, numberId, course, res) {
  //Verifica se existe algum utilizador com o mesmo email na base de dados

  stored_valuesEmail = []
  stored_valuesNumber = []

  let limit;

  //Variáveis a serem verificadas no loop
  let EmailExists = 1
  let NumberExists = 1

  //Buscar Users à base de dados
  let sql = "SELECT email, number FROM users";

  let results = await new Promise((resolve, reject) =>
    dbase.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("ola:")
        resolve(result);
        console.log('results', result[1])
        //guardar os valores(emails) no array
        limit = result.length;
        for (let i = 0; i < limit; i++) {
          stored_valuesEmail.push(result[i].email)
          stored_valuesNumber.push(result[i].number)
        }
      }
    })
  );


  //Verifica se existe algum utilizador com o mesmo email
  for (let i = 0; i < limit; i++) {
    console.log("email:", stored_valuesEmail[i])
    if(stored_valuesEmail[i] == email){
      console.log("Este email já existe na base de dados")
      EmailExists = 0;
      res.json("Já existe um utilizador com esse Email")
    }
  }

  //Verificar se existe algum utilizador com o mesmo numero
  for (let i = 0; i < limit; i++) {
    console.log("number:", stored_valuesNumber[i])
    if(stored_valuesNumber[i] == numberId){
      console.log("Este numero já existe na base de dados")
      NumberExists = 0;
      res.json("Já existe um utilizador com esse numero")
    }
  }

  //Caso não exista insere os valores na bd
  
  if (EmailExists == 1 && NumberExists == 1) {
    insertValue(name, email, password, numberId, course, res)
  }
}

function insertValue(name, email, password, numberId, course, res) {
  const saltRounds = 10;

  let UsernameValue = name;
  let EmailValue = email;
  let PasswordValue = password;
  let NumberValue = numberId
  let CourseValue = course

  //Encriptar password
  bcrypt.hash(PasswordValue, saltRounds, function(err, hash) {
    //inserir na base de dados

    let sql2 =
    "INSERT INTO users (username, email, password, number, course) VALUES ('" +
    UsernameValue +
    "', '" +
    EmailValue +
    "', '" +
    hash +
    "', '"+
    NumberValue +
    "', '"+
    CourseValue +"')"

    dbase.query(sql2, (err, result) => {
      if (err) throw err;
      console.log("Value Added To DataBase");
      res.json("Utilizador adicionado");
    })
  
  }) 


}



module.exports = routes;