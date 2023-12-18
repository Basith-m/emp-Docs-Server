const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        // destination for storing
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        // setting filename
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

// check file extension 
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
        callback(null,true)
    }else{
        callback(null,flase)
        return callback(new Error("Only png,jpg,jpeg files are allowed"))
    }
}

// for the above two variable is of multer
const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig