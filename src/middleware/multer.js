import multer from "multer";

const storage = multer.memoryStorage();

 const upload = multer({
    storage,
    limits: {fileSize: 1 * 1024 * 1024}, // 1 MB limit
    fileFilter: (req, file, cb) =>{
        if(file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("only image files are allowed!"), false);
    }
});

export default upload;
 