import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './Sidebar.css'; 
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';





const Sidebar = () => {

  //adicionar um estado á sidebar para dps verificar se a largur ira diminuir
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const [role, setRole] = useState('');
  const [name, setName] = useState('')

  var isDarkMode = false

  //função que é chamada quando de clica no incon
  const handleToggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed);
      console.log(sidebarCollapsed)
      localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
  };


  useEffect(() => {

    const accessToken = localStorage.getItem('token');
    const decoded = jwt_decode(accessToken);
    console.log(decoded);

    isDarkMode = localStorage.getItem('mode')
    console.log("darkmode",isDarkMode)
    setRole(decoded.role)
    console.log("decoded usernameeeee", decoded.username)
    setName(decoded.name)
  }, []);

   
  
  
    return (
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} `}>
        <div className='sidebar-inner'>
        <div className='menu_bars'>
        <FontAwesomeIcon icon={faBars} onClick={() => { handleToggleSidebar();}} />
        </div>
        <div className="profile">
          <div className="profile_image">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="profile_name">{name}</div>
        </div>
        <ul className="side_bar_menu">
          {role === 'admin' ? (

            <>
              <li className={`side_bar_item ${location.pathname === '/users' ? 'active' : ''}`}>
                <Link to="/users" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faUsers} /> <h3>Utilizadores</h3></div></Link>
              </li>

              <li className={`side_bar_item ${location.pathname === '/requests' ? 'active' : ''}`}>
                <Link to="/requests" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faBell} /> <h3>Pedidos</h3></div></Link>
              </li>

              <li className={`side_bar_item ${location.pathname === '/students' ? 'active' : ''}`}>
                <Link to="/students" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faGraduationCap} /> <h3>Alunos</h3> </div></Link>
              </li>

              <li className={`side_bar_item ${location.pathname === '/inventory' ? 'active' : ''}`}>
                <Link to="/inventory" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
              </li>

              <li className='side_bar_item'>
                <Link to="/horarios" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faCalendar} /> <h3>Horários</h3></div></Link>
              </li>

              <li className='side_bar_item'>
                <Link to="/lotacao" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faPeopleGroup} /> <h3>Lotação</h3></div></Link>
              </li>
            </>

          ) : role === 'professor' ? (
              <>
                <li className={`side_bar_item ${location.pathname === '/students' ? 'active' : ''}`}>
                    <Link to="/students" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faGraduationCap} /> <h3>Alunos</h3> </div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/inventory" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/horarios" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faCalendar} /> <h3>Horários</h3></div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/lotacao" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faPeopleGroup} /> <h3>Lotação</h3></div></Link>
                </li>
              </>
          ):(
              <>
                <li className='side_bar_item'>
                    <Link to="/inventory" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/horarios" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faCalendar} /> <h3>Horários</h3></div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/lotacao" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faPeopleGroup} /> <h3>Lotação</h3></div></Link>
                </li>
              </>

          )}
        </ul>
        </div>
      </div>
    );
};


export default Sidebar;