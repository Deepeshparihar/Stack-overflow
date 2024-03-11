/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import { jwtDecode } from "jwt-decode";
import icon from "../../assets/icon.png";
import close from "../../assets/close.png";

const Navbar = ({ isOpen, toggleSidebar }) => {
  var User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <nav className="main-nav">
      <div className="menu-button" onClick={handleToggleSidebar}>
        {/* Display menu icon or close icon based on sidebar state */}
        {isOpen ? (
          <span>
            {" "}
            <img src={close} alt="logo" width="14px" height="14px" />
          </span>
        ) : (
          <span>
            <img src={menu} alt="logo" width="18px" height="18px" />
          </span>
        )}
      </div>
      <div className="navbar">
        <Link to="/" className="nav-icon">
          <img src={icon} alt="logo" width="32px" height="32px" />
        </Link>
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" width="150px" height="30px" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="search" width="18" className="search-icon" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Avatar
              className="Avatar"
              backgroundColor="#009dff"
              px="8px"
              py="13px"
              color="white"
              borderRadius="50%"
            >
              <Link
                to={`/Users/${User.result._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>

            <button className="nav-item nav-links" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
