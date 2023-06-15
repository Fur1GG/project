import React, { useState } from 'react';
import './NavbarHome.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun  } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';





const NavbarHome = () => {

    //função que é chamada quando de clica no icon
    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    //adicionar um estado para dps verificar quando fica ou nao em darkmode
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
      <nav className={`navbar_home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

        <div className='navbar_home_logo'>
            <Link to="/home" className='navbar-logo'>
            <img src={isDarkMode ? "/images/1.png" : "/images/logo_teste2.png"} alt=''/>
            </Link>            
        </div>

        <div className='navbar_home_title'>
            <h1>SINS-LAB</h1>
        </div>

        <ul className="navbar_menu1"> 

          <li className="navbar_home_items" onClick={handleThemeToggle}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{ color: isDarkMode ? "#fff" : "#0e46ff" }}  />
          </li>

          <li className="navbar_home_items">
          <FontAwesomeIcon icon={faEnvelope} style={{ color: isDarkMode ? "#fff" : "#0e46ff" }} />
          </li>

        </ul>

      </nav>
    );
};

export default NavbarHome;