import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [button, setButton] = useState(true)

  //fazer botao aparecer quando o tamanho da janela diminui
  const showbutton = () => {
    if(window.innerWidth <= 960){
        setButton(false);
        } else{
            setButton(true);
    }
  }
  //fazer com que o botão nao apareça quando se dá refresh á pagina
  useEffect (() => {
    showbutton();
  }, []);
  
  window.addEventListener('resize', showbutton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar_container'>
          <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
            <img src="/images/logo_teste2.png" alt=''/>
          </Link>
          <div className='menu_icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} style={{ color: '#3ca9e2' }}/>
          </div>
          <ul className={click ? 'nav_menu active' : 'nav_menu'}>
            <li className='nav_item'>
                <Link to="/about.us" className='nav_links' onClick={closeMobileMenu}>
                    About Us
                </Link>
            </li>
            <li className='nav_item'>
                <Link to="/contact.us" className='nav_links' onClick={closeMobileMenu}>
                    Contact Us
                </Link>
            </li>
            <li className='nav_item'>
                <Link to="/login" className='nav_links' onClick={closeMobileMenu}>
                    Login
                </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn_outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

