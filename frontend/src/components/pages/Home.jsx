import React from 'react';
import './Home.css'; 
import Sidebar from './Sidebar';
import NavbarHome from './NavbarHome';
  

const HomePage = () => {
  return (
    <div className="home_container">
      <Sidebar />
      <div className="home_content">
      <NavbarHome />

      <div className='home_body'>
        <h1>Bem-vindo à Página Inicial do SINS LAB</h1>
        <p>
          jgkndfkçakdglsdfkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjgçsdklfnbvlkndflçbnkdlkfbnlºdnfb
          dfçjbkdjfbndlºkfbndlºkfnblºadnflbknadlºkbn
        </p>
      </div>

      </div>
    </div>
  );
};

export default HomePage;
