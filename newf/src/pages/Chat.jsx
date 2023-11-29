import React, { useState } from "react";
import Menu from "./components/Menu.jsx";
import Message from "./components/Message.jsx";
import NotChat from "./components/NotChat.jsx";
import { useAuth } from "../context/auth.js";
import "../css/chat.css";
const Chat = () => {
  const {person} = useAuth();
  const [text,setText] = useState("");

  
  return (
    <>
    
        <div className="space" />
        <div className="con_chat">
          <Menu text={text} setText={setText}/>
        {Object.keys(person).length>2?<> <Message /></>:<><NotChat/></>}
         
        </div>
    </>
  );
};

export default Chat;
