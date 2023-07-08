import React from 'react';
import './Home.css'; 
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
  

const HomePage = () => {
  return (
    <div className="home_container">
      <Sidebar />
      <div className="home_content">
      <NavbarHome />

      <div className='home_body'>
        <h1>Bem-vindo à Página Inicial do SINS LAB</h1>
      </div>

      </div>
    </div>
  );
};

export default HomePage;
