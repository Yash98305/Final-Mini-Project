import { useState, useEffect, useContext, createContext, useRef } from "react";
import { io } from 'socket.io-client';
import axios from "axios";
const api = "https://final-mini-project-e6ol.onrender.com/api/v1";
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const socket = useRef();


  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

    //eslint-disable-next-line
  }, []);

  
  useEffect(() => {
  socket.current = io("ws://final-mini-project-e6ol.onrender.com", {
    withCredentials: true,
  });

  // Optional: log or handle socket events here
  socket.current.on("connect", () => {
    console.log("Connected to socket.io server");
  });

  return () => {
    socket.current.disconnect(); // clean up on unmount
  };
}, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        person,
        setPerson,
        socket,
        activeUsers,
        api,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,showEmojiPicker,setShowEmojiPicker
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
