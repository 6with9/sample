import React from 'react'
import { useNavigate } from 'react-router-dom'
import {SidebarData} from './SidebarData'
import SidebarIcon from './SidebarIcon.js'

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="Sidebar">
        <SidebarIcon />
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
            return (
                <li 
                    key={key}
                    id={window.location.pathname === value.link ? "active" : ""}
                    className="row" 
                    onClick={()=> {
                        //window.location.pathname = value.link
                        navigate(value.link)
                    }}
                >
                    <div id="icon">{value.icon}</div>
                    <div id="title">{value.title}</div>
                </li>
            )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
