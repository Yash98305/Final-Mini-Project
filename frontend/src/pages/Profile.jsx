import  { useEffect, useState } from "react";
import "../css/profile.css";
import ProfileDetail from "./components/ProfileDetail";
import axios from "axios";
import { useAuth } from "../context/auth";
const Profile = () => {

  const [user, setuser] = useState([]);
const{api}=useAuth()
  const getUser = async () => {
    try {
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      const res = await axios.get(`${api}/user/myprofile`,{  
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
  }, [api]);

 
  return (
    <>
      <ProfileDetail
          />
    </>
  );
};

export default Profile;
