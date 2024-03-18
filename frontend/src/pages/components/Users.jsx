import React, { useContext, useEffect, useState } from "react";
import "../../css/users.css";
import { useAuth } from "../../context/auth.js";
import axios from "axios";

const Users = (props) => {
  const {auth,setPerson,socket,setActiveUsers}= useAuth();

const img =props.val.avatar
    const setconvertion = async(data) => {
  try {
    await axios.post("http://localhost:8000/api/v1/user/conversation/add",data)
  } catch (error) {
    console.log(error.message)
  }
    };

    const getuser = async () => {
    setPerson(props.val);
    await setconvertion({
      senderId: auth.user._id,
      receiverId: props.val._id
    });
  };
  useEffect(() => {
    socket.current.emit("addUser", { id: auth.user._id });
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [auth]);
  return (
    <>
      <div className="menu_user" onClick={() => getuser()}>
        <img
          src={
            !props.photo
              ? img
              : `http://localhost:8000/api/v1/user/photo/${props.val._id}`
          } alt={props.name}
        />
        <div>
          <div>{props.name}</div>
          <div>{props.name}</div>
        </div>
      </div>
    </>
  );
};

export default Users;
