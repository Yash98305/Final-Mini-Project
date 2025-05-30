const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const Conversation = require("../models/conversationModel.js");
const Message = require("../models/messageModel.js");
const sendToken = require("../jwtToken/jwtToken.js");
const sendEmail = require("../utils/nodemailer.js");
const fs = require("fs") ;
const assert = require("assert");



exports.userLoginController = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

exports.userRegisterController = catchAsyncErrors(async (req, res, next) => { 
  // const {name,phone, email, password } = req.body;
  // if (!name|| !phone || !email || !password) {
  //   return next(new ErrorHandler("Please Enter Required Field", 400));
  // }
  // const usere = await User.findOne({ email }).select("+password");
  // if (!usere) {
  //   return next(new ErrorHandler("Email Exist", 401));
  // }
    const user = new User({
      ...req.body
    });
    await user.save(); 
    sendToken(user, 201, res);
});

exports.getUserDetailsController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});


// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");
//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Old password is incorrect", 400));
//   }
//   if (req.body.newPassword !== req.body.conformPassword) {
//     return next(new ErrorHandler("password does not match", 400));
//   }
//   user.password = req.body.newPassword;
//   await user.save();
//   sendToken(user, 200, res);
// });

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  
  const { photo } = req.files;
 
  if(photo && photo.size > 1000000){
    return res
      .status(500)
      .send({ error: "photo is Required and should be less then 1mb" });
}

const user = await User.findByIdAndUpdate(
  req.params.id,
  { ...req.fields},
  { new: true,
    runValidators: true,
    useFindAndModify: false, }
);

if (photo) {
  console.log(photo)
  user.photo.data = fs.readFileSync(photo.path);
  user.photo.contentType = photo.type;
}

await user.save();
  res.status(200).json({
    success: true,
    user
  });
});

exports.getAllUserController = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ _id: { $nin: [(req.body._id)] } });

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getAllUsersPhotoController = catchAsyncErrors(async (req, res,next) => {
  const users = await User.findById(req.params.pid).select("photo");

    if (users.photo.data) {
      res.set("Content-type", users.photo.contentType);
      return res.status(200).send(users.photo.data);
    }
  
})

exports.newConvertionController = catchAsyncErrors(async(req,res,next)=>{
  const {senderId , receiverId} = req.body;
const exist = await Conversation.findOne({
  members:{
    $all : [receiverId,senderId]
  }
})
if(exist){
  return res.status(200).json({
    message : "conversation already exists"
  })
}

const newConvertion = new Conversation({
  members : [senderId , receiverId]
})
await newConvertion.save();
return res.status(200).json({
  message : "conversation saved successfully"
})
})

exports.getConversationController = catchAsyncErrors(async(req,res,next)=>{
  const {senderId , receiverId} = req.body;
  let conversation = await Conversation.findOne({
    members : {
      $all : [receiverId,senderId]    }
    })
  return res.status(200).json(conversation)
})

exports.newMessageController = catchAsyncErrors(async(req,res,next)=>{
const newMessage = new Message(req.body)
await newMessage.save()
await Conversation.findByIdAndUpdate(req.body.conversationId, {message:req.body.text})
return res.status(200).json({
  message : "message has sent"
})
})

exports.getMessagesController = catchAsyncErrors(async(req,res,next)=>{
  const message = await Message.find({conversationId : req.params.id})
  return res.status(200).json(message)
})

exports.uploadFileController = catchAsyncErrors(async(req,res,next)=>{
  if(!req.file){
    return res.status(404).json("file not found")
  }
  const imageUrl = `${api}/user/file/${req.file.filename}`
  return res.status(200).json(imageUrl)
})