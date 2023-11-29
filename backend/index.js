const express = require("express");
const app = express();
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js")
const userRoute = require('./routes/userRoute.js')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const {fileURLToPath} = require("url");

dotenv.config()

app.use(cors());
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

app.use(errorMiddleware);

module.exports = app;