import path from 'path';
import multer from 'multer';
import { AppError } from '../utils/AppError';
const upload = multer({
  dest:"uploads/",
  limits:{fileSize:5*1024*1024}, // max size is 50mb 
  storage:multer.diskStorage({
    destination:"uploads/",
    filename:(_req,file,cb)=>{
      cb(null,file.originalname);
    }
  }),
  fileFilter:(_req,file,cb)=>{
    let ext = path.extname(file.originalname);
    if(
      ext !==".jpg" && 
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4" 
    ){
      throw new AppError(`Unsupported file type! ${ext}`,400);
      cb(null,false);
    }

    cb(null,true);
  }
})

export default upload;