import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <div className={`Sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <NavLink to="/" className="side-nav-links1" activeclassname="active">
            <p>Home</p>
          </NavLink>
          <div className="side-nav-div1">
            <div>
              <p>PUBLIC</p>
            </div>
            <NavLink
              to="/Questions"
              className="side-nav-links1"
              activeclassname="active"
            >
              <img src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
            <NavLink
              to="/Tags"
              className="side-nav-links1"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
            <NavLink
              to="/Users"
              className="side-nav-links1"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>
            </NavLink>
            <NavLink
              to="/CardsPage"
              className="side-nav-links1"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Connect</p>
            </NavLink>
            <NavLink
              to="/Subscription"
              className="side-nav-links1"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Subscription</p>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
