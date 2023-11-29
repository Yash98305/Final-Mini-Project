import React, { useEffect, useState } from "react";
import img1 from "../../icons/happiness.png";
import img2 from "../../icons/paperclip-solid.png";
import img3 from "../../icons/microphone-solid.png";
import axios from "axios";
import Picker from "emoji-picker-react";
import { useAuth } from "../../context/auth";
const MessageFooter = ({ SendText,setNewmessageFlag,Send, setValue, value,showEmojiPicker,setShowEmojiPicker,conversation }) => {
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
const {auth,person,socket} = useAuth();

const newMessage = async (data) => {
  try {
    await axios.post("http://localhost:8000/api/v1/user/message/add", data);
  } catch (error) {
    console.log(error.message);
  }
};
  

  return (<>
    <div className="messagefooter">
    <div className="emoji">
      <img src={img1} alt="" onClick={handleEmojiPickerhideShow} />
        </div>  
    <input
        type="text"
        placeholder="Type Here...."
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => SendText(e)}
        value={value}
      />
       <div onClick={Send} className="svg-wrapper svg-rot"  style={{cursor:"pointer"}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
      </svg>
    </div>
    </div>

    </>
  );
};

export default MessageFooter;
