import React from 'react'
import Robot from "../../icons/robot.gif"
import "../../css/notchat.css"
const NotChat = () => {
const user = localStorage.getItem("auth");

  return (
    <div className='notchat'>
       <img src={Robot} alt="sorry" className="mees" />
      <h1>
        Welcome, <span>{JSON.parse(user).user.name}!</span>
      </h1>
      <p>Please select a chat to Start messaging.</p>
    </div>
  )
}

export default NotChat
