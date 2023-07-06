import React, { useState } from 'react';
import './TopbarHome.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun  } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';






const NavbarHome = () => {
    const navigate = useNavigate();

    //adicionar um estado para dps verificar quando fica ou nao em darkmode
    const [isDarkMode, setIsDarkMode] = useState(false);

    //função que é chamada quando de clica no icon
    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };



    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login')

    }

    return (
      <nav className={`navbar_home ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className='topbar-inner'>
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

          <li className="navbar_home_items" onClick={handleLogout} title='Logout'>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </li>

        </ul>
        </div>
      </nav>
    );
};

export default NavbarHome;