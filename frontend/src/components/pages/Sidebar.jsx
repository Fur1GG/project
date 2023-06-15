import React, { useState } from 'react';
import { useContext } from 'react';
import './Sidebar.css'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DarkModeContext } from '../Darkmode';




const Sidebar = () => {
    let role = 'admin';

    //constante para adicionar darkmode
    const { darkMode } = useContext(DarkModeContext);

    //adicionar um estado á sidebar para dps verificar se a largur ira diminuir
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    //função que é chamada quando de clica no incon
    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };



  
  
    return (
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        <div className='menu_bars'>
          <FontAwesomeIcon icon={faBars} onClick={handleToggleSidebar} />
        </div>
        <div className="profile">
          <div className="profile_image">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="profile_name">Diogo Silva</div>
        </div>
        <ul className="side_bar_menu">
          {role === 'admin' ? (

            <>
              <li className='side_bar_item'>
                <Link to="/users" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faUsers} /> <h3>Utilizadores</h3></div></Link>
              </li>

              <li className='side_bar_item'>
                <Link to="/requests" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faBell} /> <h3>Pedidos</h3></div></Link>
              </li>

              <li className='side_bar_item'>
                <Link to="/alunos" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faGraduationCap} /> <h3>Alunos</h3> </div></Link>
              </li>

              <li className='side_bar_item'>
                <Link to="/inventario" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
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
                <li className='side_bar_item'>
                    <Link to="/alunos" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faGraduationCap} /> <h3>Alunos</h3> </div></Link>
                </li>

                <li className='side_bar_item'>
                    <Link to="/inventario" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
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
                    <Link to="/inventario" className='side_bar_links'><div className='side_bar_item_content'><FontAwesomeIcon icon={faClipboardList} /> <h3>Inventário</h3></div></Link>
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
    );
};


export default Sidebar;