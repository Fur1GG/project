//IMPORTS

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(cors());

//Import routes
const route = require('./login_route')
const routes = require('./register_route')

//MidleWares para o bodyparser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




//Midleware para as rotas
app.use(routes)
app.use('/register', routes)
app.use('/login', route)

app.use(express.static('public'))

app.use(express.json());

app.listen(3001,() => {
    console.log('Listening on port 3001');
});

