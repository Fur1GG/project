import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './components/landing_page/LandingPage';
import Home from './components/pages/Home';
import UserList from './components/pages/Users';







//import {Routes, Routes} from "./react-router-dom"

function App() {
  return (
    <div className="App">

      
      
      <header className="App-header">
      <Router>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>  
      </header>
    </div>
  );
}


export default App;
