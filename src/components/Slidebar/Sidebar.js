import React, { useState, useRef, useEffect } from 'react'
import './Sidebar.css';
import { useNavigate } from 'react-router-dom'
import {SidebarData} from './SidebarData.js'
import SidebarIcon from './SidebarIcon.js'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function Sidebar({ onSidebarStateChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Sidebar外クリックで閉じる（オーバーレイで対応するので不要なら削除可）
  useEffect(() => {
    if (onSidebarStateChange) onSidebarStateChange(isOpen);
  }, [isOpen, onSidebarStateChange]);

  return (
    <>
      <div className="MenuButton" onClick = {() => setIsOpen(!isOpen)}>
        <MenuOpenIcon />
      </div>
      <div
        ref={sidebarRef}
        className={`Sidebar ${isOpen ? 'open': 'closed'}`}
      >
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
      {/* サイドバー以外にモザイクをかけるオーバーレイ */}
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
