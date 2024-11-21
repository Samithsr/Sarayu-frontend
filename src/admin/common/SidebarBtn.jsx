import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

const SidebarBtn = ({ path, icon, title }) => {
  return (
    <NavLink to={path} className="sidebar_btn">
      <span>
        {icon} {title}
      </span>
      <div className="sidebar_btn_circle"></div>
    </NavLink>
  );
};

export default SidebarBtn;
