const multer = require("multer")

const multerConfigMemoryStorage = {
    storage:multer.memoryStorage(),
    limits:{
        fileSize:1024*1024*2
    },
    filefilter: function(req,file,cb){
        if(file.mimetype==="image/jpeg"|| file.mimetype==="image/png"){
            cb(null,true)
        }
        else{
            var newError= new Error("file type is incorrect");
            cb(newError,false)
        }
    }

}


const upload = multer(multerConfigMemoryStorage)

module.exports=upload
