const {dbase} = require("./db.js")
const express = require('express');
const routes = express.Router();


routes.post('/', function authenticate(req, res) {


    const authHeader = req.body.token['token'];
    console.log("oleeeeeeeeeee", authHeader)

    if (typeof authHeader !== 'undefined') {
        const token = authHeader && authHeader.split(' ')[1];
        



        //verificar validade do token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (expired, UserData) => {
            if(expired == "TokenExpiredError: jwt expired") {
                res.json("Access Token expired")
            } else if (expired == "JsonWebTokenError: invalid algorithm"){
                res.json("Invalid Acess Token")
            } else if(expired == "JsonWebTokenError: invalid signature"){
                res.json("Invalid Signature")
            }

            req.user = UserData

            if(req.user != null) {
                res.json(UserData)
            }
        })
    } else{
        res.status(403).json("Algo está errado")
    }
})

module.exports = routes;