import React, { useEffect } from "react";
import "../../css/message.css";
import Search from "./Search"
import { useAuth } from "../../context/auth";

const MessageHeader = ({personi}) => {
  
  const img =personi.avatar
    const{activeUsers,api} = useAuth();
useEffect(()=>{

},[api])
 
    return (
    <div className="messageheader">
      <div>
        <img src={!personi.photo?img:`${api}/user/photo/${personi._id}`} alt="" className="dp" />
        <div>
            <p className="user_name">{personi.name}</p>
            <p className="user_status">{activeUsers?.find(user => user.id === personi._id)?<span style={{
              color:"green"
            }}>Online</span>:<span style={{
              color:"red"
            }}>Offline</span>}</p>
        </div>
      </div>
      <div>
<Search/>
      </div>
    </div>
  );
};

export default MessageHeader;
