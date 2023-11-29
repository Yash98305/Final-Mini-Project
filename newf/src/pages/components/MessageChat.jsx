import axios from "axios";
import React, { useEffect, forwardRef } from "react";
import { useAuth } from "../../context/auth";
import "../../css/message.css"
import MessageFooter from "./MessageFooter";
const MessageChat = forwardRef(({ message },ref) => {
  const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
  const {auth} = useAuth();
 
 
  return (
    <>
    <div ref={ref}>
      {auth.user._id === message.senderId ? (
        <div className="sender">
          <div className="mess">{message.text}</div>
          <div className="time">{formatDate(message.createdAt)}</div>
        </div>
      ) : (
        <div className="receiver">
          <div className="mess">{message.text}</div>
          <div className="time">{formatDate(message.createdAt)}</div>
        </div>
      )}
      </div>
      
    </>

  );
})

export default MessageChat;
