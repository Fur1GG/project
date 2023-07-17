const {dbase} = require("./db.js")
const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const jwt = require('jsonwebtoken');


routes.post('/', (req, res) => {

    let User = req.body.email;
    let Password = req.body.password;
    console.log("ola123")

    let Login = LoginCheck(User, Password, res);

    Login.then(function () {
        console.log("Successeful execution of request")
    }).catch(function () {
        console.log("Something went wrong...")
    })
})




async function LoginCheck(User, Password, res){

    //ir buscar todos os utilizadores para ver se existe algum utilizador com o mesmo email na base de dados
    let GetPassword
    let UserId
    let UserInDb = false
    let UserRole = false

    //primeiro ir buscar o email do utilizador
    let sqlUsers = "SELECT email FROM users WHERE email = '" + User + "'";

    let ResultUsers = await new Promise((resolve, reject) => dbase.query(sqlUsers, (err, resultUser) => {

        if (err) {
            reject(err);
        } else {
            resolve(resultUser);

            limit = resultUser.length;
            console.log("emailsssssssssssssss",limit)

            //verificar se existe na base de dados
            if (limit != 0) {
                UserInDb = true

            }
        }

    }))

    //ir buscar a role
    let sqlrole = "SELECT role FROM users WHERE email = '" + User +"'"

    let ResultRole = await new Promise((resolve, reject) => dbase.query(sqlrole, (err, resultRole) => {
        if(err){
            reject(err)
        } else {
            resolve(resultRole);
            console.log("resultroleeeee",resultRole[0].role)
            if(resultRole[0].role != '') {
                UserRole = true
            }
        }
    }))

    

    

    

        // Caso o utilizador exista tem de se validar a password

        if (UserInDb == true) {

            let sql = "SELECT email, password, Id, role, username, number FROM users WHERE email = '" + User + "'"

            let ResultsDBase = await new Promise((resolve, reject) => dbase.query(sql, (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    GetPassword = result[0].password;
                    UserId = result[0].Id;
                    Role = result[0].role
                    Name = result[0].username
                    NumberId = result[0].number
                }

            }))
            
            


            //comparar os valores de hash das passwords
            bcrypt.compare(Password, GetPassword, async function (err, result) {
                console.log('Result', result)
                if (result == true) {
                    if (UserRole == true) {
                        //Informação do utilizador na Tooken
                        let userData = {
                            "email" : User,
                            "Id" : UserId,
                            "role" : Role,
                            "name" : Name,
                            "number" : NumberId
                        }
                        console.log("UserData", userData)
                        
                        //TOKENS
                        const accessToken = jwt.sign(userData , process.env.ACCESS_TOKEN_SECRET ,{expiresIn: '1d'});
                        const refreshToken = jwt.sign(userData , process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

                        //Update ano refreshtoken na base de dados
                        //Este User é o email que é mandado do front end para o backend ao fazer o login
                        let sqlToken = "UPDATE users SET refreshToken = '" + refreshToken + "'WHERE email = '" + User + "'"

                        let ResultsDBase = await new Promise((resolve, reject) => dbase.query(sqlToken, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }));


                        
                        res.json({
                            accessToken: accessToken, Name, Role
                        });

                    } else {
                        res.json("A sua conta ainda se encontra em verificação")
                    }

                } else {
                    //ou seja, caso a pass não coicida
                    console.log("Ups")
                    res.json("Pass errada")
                }

            });

        } else {
            res.json("Utilizador nao existe!")
        }



} 

module.exports = routes