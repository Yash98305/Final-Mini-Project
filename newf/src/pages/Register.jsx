import React, { useState } from "react";
import "../css/register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../icons/user.png";
import img2 from "../icons/email.png";
import img3 from "../icons/phone-call.png";
import img4 from "../icons/padlock.png";
import img5 from "../icons/mes.gif";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          name,
          email,
          phone,
          password,
          avatar : api
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const api = `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}.png`;

  return (
    <>
      <div className="space"></div>
      <div className="con_form">
      <div>
        <img src={img5} alt="sorry" className="mes"/>
      </div>
        <div className="wrapper wr">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input-field">
              <input
                type="text"
                value={name}
                name="name"
                required
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <label>
                {" "}
                <img src={img1} alt="" className="icon" />
                <p>Enter your name</p>
              </label>
            </div>
            <div className="input-field">
              <input
                type="email"
                value={email}
                name="email"
                required
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
                type="text"
                value={phone}
                required
                name="phone"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              <label>
                <img src={img3} alt="" className="icon" />
                <p>Enter your phone</p>
              </label>
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                name="password"
                required
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
  <span>Register</span>
</button>         
   <div className="register">
              <p>
                Already have an account? <NavLink to="/login">Login </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
