const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage")

const storage = new GridFsStorage({
    url : process.env.MONGO_URL || "mongodb://localhost:27017/chat_app" ,
    
    options : {
        family : 4
    },
    file : (req,file)=>{
const match = ["image/png","image/jpg"]
   if (match.indexOf(file.mineType)=== -1){
    return `${Date.now()}-file-${file.originalname}`
   }
   return{
    bucketName : "photos",
    filename : `${Date.now()}-file-${file.originalname}`
   }
}
})
module.exports = multer({storage:storage})