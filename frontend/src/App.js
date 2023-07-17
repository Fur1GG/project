import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/pages/Home';
import UserList from './components/pages/Users';
import RequestsList from './components/pages/Requests';
import { PrivateRoutes } from './AuthService';
import { useState } from 'react';
import StudentsList from './components/pages/Students'
import Inventory from './components/pages/Inventory';
import HorarioForm from './components/pages/Schedules';
import Capacity from './components/pages/Capacity';








//import {Routes, Routes} from "./react-router-dom"

function App() {

  const[auth, setAuth] = useState(null);

  return (
    <div className="App">

      
      
      <header className="App-header">
      <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route elemnt={<PrivateRoutes auth={auth} setAuth={setAuth} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/requests" element={<RequestsList />} />
              <Route path='/students' element={<StudentsList/>} />
              <Route path='/inventory' element={<Inventory/>} />
              <Route path='/schedules' element={<HorarioForm/>} />  
              <Route path='/capacity' element={<Capacity/>} />                              
            </Route>
        </Routes>
      </Router>  
      </header>
    </div>
  );
}


export default App;
