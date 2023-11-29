import React, { useEffect, useState } from "react";
import "../css/profile.css";
import ProfileDetail from "./components/ProfileDetail";
import axios from "axios";
import { useAuth } from "../context/auth";
const Profile = () => {

  const [user, setuser] = useState([]);
const{auth,socket,setActiveUsers}=useAuth()
  const getUser = async () => {
    try {
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      const res = await axios.get("http://localhost:8000/api/v1/user/myprofile",{  
        headers: {
        Authorization: ls.token,
      }})
      setuser(res.data.user);
    } catch (e) {
      console.log("Error while fetching all user data");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

 
  return (
    <>
      <ProfileDetail
          />
    </>
  );
};

export default Profile;
