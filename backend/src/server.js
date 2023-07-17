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
const Requests = require("./requests_route")
const Update_advisor = require("./update_advisor")
const Students_route = require("./students_route")
const GetInventory_route = require("./get_inventory")
const SetInventory_route = require("./set_inventory")
const Remove_item = require("./remove_item")
const Request_item = require("./request_item")
const Return_item = require("./return_item")
const GetRequestedItems = require("./get_item_requested")
const SetSchedules = require("./add_schedule")
const GetCapacity = require("./get_capacity")
const GetMySchedules = require("./getmy_schedule")



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
app.use('/requests', Requests)
app.use('/updateAdvisor', Update_advisor)
app.use('/students', Students_route)
app.use('/getinventory', GetInventory_route)
app.use('/setinventory', SetInventory_route)
app.use('/removeItem', Remove_item)
app.use('/requestItem', Request_item)
app.use('/returnItem', Return_item)
app.use('/getrequestedItems', GetRequestedItems)
app.use('/setSchedules', SetSchedules)
app.use('/getCapacity', GetCapacity)
app.use('/getmyschedule', GetMySchedules)






app.use(express.static('public'))
app.use(express.json());


app.listen(3001,() => {
    console.log('Listening on port 3001');
});

