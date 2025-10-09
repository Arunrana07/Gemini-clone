import {React, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets.js";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExtended (prev=>!prev)} src={assets.menu_icon} alt="" className="menu" />
        <div className="new-chat">
         <div> <img src={assets.plus_icon} alt="" /></div>
         <div>{extended ? <p>New Chat</p> : null}</div>
        </div>
        {extended ? 
        <div className="recent">
          <p className="recent-title">
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is react ......</p>
            </div>
          </p>
        </div>: null}
      </div> 
      <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
         {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
          {extended ? <p>setting</p> : null}
          </div>
      </div>
    </div>
  );
}

export default Sidebar;
