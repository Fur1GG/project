//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(cors());

//Import routes
const Login_route = require('./login_route')
const Register_route = require('./register_route')
const Users_route = require('./users_route')
const Remove_user = require('./remove_user')
const Update_user = require('./update_user')



//MidleWares para o bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




//Midleware para as rotas
app.use('/register', Register_route)
app.use('/login', Login_route)
app.use('/users', Users_route)
app.use('/removeUser', Remove_user)
app.use('/updateUser', Update_user)



app.use(express.static('public'))
app.use(express.json());


app.listen(3001,() => {
    console.log('Listening on port 3001');
});

