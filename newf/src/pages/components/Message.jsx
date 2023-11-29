import React, { createContext, useContext, useEffect, useState ,useRef} from "react";
import "../../css/message.css";
import MessageHeader from "./MessageHeader";
import MessageChat from "./MessageChat";
import MessageFooter from "./MessageFooter";
import { useAuth } from "../../context/auth";
import axios from "axios";
import img1 from "../../icons/face-smile-regular.png";
import Picker from "emoji-picker-react";


const Message = () => {
  const {auth, person, socket,showEmojiPicker,setShowEmojiPicker} = useAuth();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});
  const [newmessageFlag, setNewmessageFlag] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(false);

  // const [file, setfile] = useState();
useEffect(()=>{
socket.current.on("getMessage",data=>{
  setIncomingMessage({...data,
createdAt : Date.now()})
})
},[])
  const newMessage = async (data) => {
    try {
      await axios.post("http://localhost:8000/api/v1/user/message/add", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEmojiClick = (emojiObject,event) => {

    let message = value;
    message += emojiObject.emoji;
    setValue(message);
  };
  const SendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13 && value!=="") {
      let message = {
        senderId: auth.user._id,
        receiverId: person._id,
        conversationId: conversation._id,
        type: "text",
        text: value,
      };

      socket.current.emit("sendMessage", message)
      await newMessage(message);

      setValue("");
      setNewmessageFlag((prev) => !prev);
    }
  };

  const Send = async () => {
    if(value!==""){
      let message = {
        senderId: auth.user._id,
        receiverId: person._id,
        conversationId: conversation._id,
        type: "text",
        text: value,
      };

      socket.current.emit("sendMessage", message)
      await newMessage(message);

      setValue("");
      setNewmessageFlag((prev) => !prev);
    }
  }

  const getConversation = async (data) => {
    try {
      let res = await axios.post(
        "http://localhost:8000/api/v1/user/conversation/get",
        data
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getMessages = async (id) => {
    try {
      let res = await axios.get(
        `http://localhost:8000/api/v1/user/message/get/${id}`
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };



  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: auth.user._id,
        receiverId: person._id,
      });
      setConversation(data);
    };
    getConversationDetails();
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newmessageFlag]);
 
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(()=>{
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId)
&&setMessages(prev => [...prev,incomingMessage])  },[incomingMessage,conversation])
const scrollRef = useRef();
useEffect(() => {
  scrollRef.current?.scrollIntoView({ transition: "smooth" });
}, []);
const handleEmojiPickerhideShowt = () => {
  setShowEmojiPicker(true);
};
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(false);
  };
 



  return (
    <div className="con_message">
      {/* //3 part h */}

      <MessageHeader personi={person} />

      <div className="messagechat" onClick={handleEmojiPickerhideShow} >
    
        {messages &&
          messages.map((message,index) => {
            const isLastMessage = index === messages.length - 1;
            return <MessageChat  key={Math.floor(100000 + Math.random() * 900000)} ref={isLastMessage ? scrollRef : null} message={message} />;
          })}
          <div className="pick" onClick={handleEmojiPickerhideShowt}>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}  />}
</div>       
      </div>
      <MessageFooter SendText={SendText} Send={Send} setValue={setValue} value={value} conversation={conversation} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setNewmessageFlag={setNewmessageFlag}/>
     
    </div>
  );
};

export default Message;
