import React, { useState, useRef } from 'react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom'
import { SidebarData } from './SidebarData.js'
import SidebarIcon from './SidebarIcon.js'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  return (
    <>
      <button
        className="MenuButton"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニューを開く"
        type="button"
      >
        <MenuOpenIcon fontSize="large" />
      </button>
      <div
        ref={sidebarRef}
        className={`Sidebar ${isOpen ? 'open' : 'closed'}`}
      >
        <SidebarIcon />
        <ul className="SidebarList">
          {SidebarData.map((value, key) => (
            <li
              key={key}
              className="row"
              onClick={() => {
                navigate(value.link)
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <div
          className="SidebarOverlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
