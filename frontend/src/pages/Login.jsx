import React, { useState} from "react";
import "../css/login.css";
import axios from "axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/auth.js";
import img2 from "../icons/email.png";
import img4 from "../icons/padlock.png";
import img5 from "../icons/mes.gif";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email,
          password,
        },
        // { headers: { "Content-Type": "application/json" } }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
           ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        toast.success("Login in successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/chat");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="space"></div>
      <div className="con_form">
      <div>
        <img src={img5} alt="sorry" className="mes"/>
      </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-field">
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
            
              />
              <label>
                <img src={img2} alt="" className="icon" />
               <p>Enter your email</p>
              </label>
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                name="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <label>
           
                <img src={img4} alt="" className="icon" />
              <p>Enter your password</p>
              </label>
            </div>

            <button type="submit" className="button2">
  <div className="svg-wrapper-1">
    <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
  </div>
  <span>Log In</span>
</button>
            {/* <div className="forget">
              <NavLink to="/forgot">Forgot password?</NavLink>
            </div> */}
            <div className="register">
              <p>
                Don't have an account?{" "}
                <NavLink to="/register">Register</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
