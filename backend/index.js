
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js")
const userRoute = require('./routes/userRoute.js')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const {fileURLToPath} = require("url");

dotenv.config()
const server = http.createServer(app); // Create HTTP Server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow all origins (update this for production)
         credentials: true
    }
});

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/user',userRoute);

app.get('/',(req,res)=>{
    res.send({
        message:"welcome to chat application"
    })
})
let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.id === userData.id) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.id === userId);
}

io.on('connection',  (socket) => {
    console.log('user connected')

    //connect
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        user && io.to(user.socketId).emit('getMessage', data)
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })})
app.use(errorMiddleware);

module.exports = { app, server };