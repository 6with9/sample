import React, { useState } from 'react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom'
import {SidebarData} from './SidebarData.js'
import SidebarIcon from './SidebarIcon.js'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="MenuButton" onClick = {() => setIsOpen(!isOpen)}>
        <MenuOpenIcon />
      </div>
      <div className={`Sidebar ${isOpen ? 'open': 'closed'}`} onMouseLeave={() => setIsOpen(false)}>
          <SidebarIcon />
          <ul className="SidebarList">
            {SidebarData.map((value, key) => (
                  <li 
                      key={key}
                      className="row" 
                      onClick={()=> {
                          navigate(value.link)
                      }}
                  >
                      <div id="icon">{value.icon}</div>
                      <div id="title">{value.title}</div>
                  </li>
              ))}
          </ul>
        </div>
    </>
  );
}

export default Sidebar
