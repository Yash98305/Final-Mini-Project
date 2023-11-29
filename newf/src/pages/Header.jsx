import React, { useEffect } from "react";
import "../css/header.css";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import img1 from "./../icons/ilogo.png"
const Header = () => {
  const {auth, setAuth,socket,setActiveUsers} = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    socket.current.emit("disconnect")
  };
 
  return (
    <>
      <div className="nav">
        <div className="logo"><img src={img1} alt="#" /> <span>iChat</span></div>
        <div className="pages">
          {!auth?.user ? (
            <>
              <NavLink className="link" to="#">
                Chat
              </NavLink>
              <NavLink className="link" to="#">
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="link" to="/chat">
               Chat
              </NavLink>
              <NavLink className="link" to="/profile">
                Profile
              </NavLink>
            </>
          )}

          {!auth?.user ? (
            <>
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="link" onClick={handleLogout} to="/login">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Header;
