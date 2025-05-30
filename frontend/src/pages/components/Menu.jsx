import React, { useEffect, useState } from "react";

import "../../css/menu.css";
import Users from "./Users";
import axios from "axios";
import Search from "./Search";
import { useAuth } from "../../context/auth";

const Menu = ({setText,text}) => {
const {api} = useAuth()
  let ls = localStorage.getItem("auth");
  ls = JSON.parse(ls);
  
  const img = ls.user.avatar
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        let data = await getUsers();
        let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setUsers(fiteredData);
    }
    fetchData();
}, [text,api]);

  const getUsers = async () => {
    try {
      const res = await axios.post(
        `${api}/user/getallusers`,{
          _id : ls.user._id
        }
      );
      return res.data.users
    } catch (e) {
      console.log("Error while fetching all user data");
    }
  };



  
  return (
    <div className="con_menu">
      <div className="con_menu_head">
        <img src={!ls.user.photo?img:`${api}/user/photo/${ls.user._id}`} className="dp" alt="" />
        <div>
          <Search setText={setText}/>
        </div>
      </div>
      <div className="con_menu_user">
        {users.map((val) => {
        return(
            val._id!==ls.user._id &&
            <Users
              key={val._id}
              name={val.name}
              photo={val.photo}
              val={val}
             
            />
       
       ) })}
      </div>
    </div>
  );
};

export default Menu;
