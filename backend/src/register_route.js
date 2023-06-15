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
  console.log("Nome:", User)
  console.log("Email:", Email)
  console.log("Password:", Password)
  let Insert = insertDB(User, Email, Password, res);

  Insert.then(function () {
    console.log("Successeful execution of request");
  }).catch(function () {
    console.log("Something went wrong...")
  })

})

async function insertDB(name, email, password, res) {
  //Verifica se existe algum utilizador com o mesmo email na base de dados

  stored_valuesEmail = []

  let limit;

  //Variáveis a serem verificadas no loop
  let EmailExists = 1

  //Buscar Users à base de dados
  let sql = "SELECT email FROM users";

  let results = await new Promise((resolve, reject) =>
    dbase.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log("ola:")
        resolve(result);
        //guardar os valores(emails) no array
        limit = result.length;
        for (let i = 0; i < limit; i++) {
          stored_valuesEmail.push(result[i].email)
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

  //Caso não exista insere os valores na bd
  
  if (EmailExists == 1) {
    insertValue(name, email, password, res)
  }
}

function insertValue(name, email, password, res) {
  const saltRounds = 10;

  let UsernameValue = name;
  let EmailValue = email;
  let PasswordValue = password;

  //Encriptar password
  bcrypt.hash(PasswordValue, saltRounds, function(err, hash) {
    //inserir na base de dados

    let sql2 =
    "INSERT INTO users (username, email, password) VALUES ('" +
    UsernameValue +
    "', '" +
    EmailValue +
    "', '" +
    hash +
    "')"

    dbase.query(sql2, (err, result) => {
      if (err) throw err;
      console.log("Value Added To DataBase");
      res.json("Utilizador adicionado");
    })
  
  }) 


}



/*
routes.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email or username already exists in the database
  const sql = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const values = [email, username];

  try {
    const results = await dbase.query(sql, values);
    if (results.length > 0) {
      const existingUser = results.find((user) => user.email === email || user.username === username);
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email já está registrado.' });
      } else if (existingUser.username === username) {
        return res.status(400).json({ error: 'Nome de usuário já está registrado.' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Algo deu errado ao verificar se o email ou nome de usuário já estão registrados.' });
  }

  // If the email and username are unique, hash the password and insert a new user into the database
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Algo deu errado ao criptografar a senha.' });
    }

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hash];

    try {
      const results = await dbase.query(sql, values);
      return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Algo deu errado ao inserir o usuário na base de dados.' });
    }
  });
});*/






/*
routes.post("/register", (req, res) => {
  //let Name = req.body.name;
  let User = req.body.username;
  let Email = req.body.email;
  let Password = req.body.password;

  let Insert = insertDB(User, Email, Password, res);

  Insert.then(function () {
    console.log("Successeful Execution of Request!");
  }).catch(function () {
    console.log("Something Went Wrong!");
  });
});

async function insertDB(username, email, password, res) {
  //First check if there's any user with the same username in DataBase
  //Then if there isn't INSERT in DB

  StoredValuesUserName = [];
  StoredValuesEmail = [];

  let limit;

  //True = 1
  //False = 0
  //Just initiating value that will with checked in the loop
  let UserExists = 1;
  let EmailExists = 1;

  //Getting UserNames From DB
  let sql = "SELECT username, email FROM users ;";

  let results = await new Promise((resolve, reject) =>
    dbase.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        //Storing Values in Array
        limit = result.length;
        //Getting Users
        for (let i = 0; i < limit; i++) {
          StoredValuesEmail.push(result[i].Email);
          StoredValuesUserName.push(result[i].UserName);
        }
      }
    })
  );

    //Checking if there's someone with the same email

    for (let l = 0; l < limit; l++) {
      if (StoredValuesEmail[l] == email) {
        console.log("Email Already Exists in DB");
        EmailExists = 0;
        res.json("Já existe um utilizador com esse Email");
      }
    }
  
    //If User doesn't exist Execute Function
  
    if (UserExists == 1 && EmailExists == 1) {
      insertValue(username, email, password, res);
    }

}

function insertValue(username, email, password, res) {
  const saltRounds = 10;

  let UsernameValue = username;
  let EmailValue = email;
  let PasswordValue = password;

  //Hash Password
  bcrypt.hash(PasswordValue, saltRounds, function (err, hash) {
    //Insert User In DataBase

    let sql2 =
      "INSERT INTO users (username, email, password) VALUES ( '" +
      UsernameValue +
      "', '" +
      EmailValue +
      "', '" +
      hash +
      "')";

    dbase.query(sql2, (err, result) => {
      if (err) throw err;
      console.log("Value Added To DataBase");
      res.json("Utilizador adicionado");
    });
  });
}
*/


/*
routes.post("/login", async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
  //ter que ir buscar primeiro todos os utilizadores para ver se ha algum na bd
  let GetPassword;
  let UserId;
  let UserInDb = false;

  //First Get The User

  let sqlUsers = "SELECT username FROM users WHERE username = '" + username + "'";

  let ResultUsers = await new Promise((resolve, reject) => dbase.query(sqlUsers, (err, resultUser) => {

      if (err) {
          reject(err);
      } else {
          resolve(resultUser);

          limit = resultUser.length;

          //Cheking if username exists in Database
          if (limit != 0) {
              UserInDb = true
          }
      }
  }));


//If User Exists then check if Password is the SAME
//Else THROW a Message to Client Side informing the USER


  if (UserInDb == true) {

      let sql = "SELECT username, password, id FROM login WHERE username = '" + username + "';"


      let ResultsDB = await new Promise((resolve, reject) => dbase.query(sql, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
              GetPassword = result[0].password;
              UserId = result[0].id;
          }
      }));

      if(password == GetPassword){
        console.log("userid", UserId)
        res.json(UserId)
      }else{
        res.json("Errado")
      }
  }else{
    res.json("Credenciais Incorretas")
  }

  res.send(username)

})

routes.post("/register",(req,res)=>{
 
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
  
    let sql = "SELECT username FROM users WHERE username='"+username+"';"
  
    dbase.query(sql, (err,result)=>{
    if(err) throw err;
  
      if(result.length>0){
        res.send({"ack":0});
      }else{
  
        let sql = "INSERT INTO users (`username`,`password`,`email`) VALUES ('"+username+"','"+password+",'"+email+"');";
  
          dbase.query(sql, (err,result)=>{
          if(err) throw err;
  
          res.send({"ack":1});
  
          });
      }
  });
  });
*/

module.exports = routes;