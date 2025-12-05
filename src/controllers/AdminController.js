import Gallery from "../models/AdminModel.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";

export const addGallery = async(req, res) => {
    try {
        const {title, category} = req.body;
        if(!req.file){
            return res.status(400).json({message: "Image file is required"})
        }

        const result = await uploadToCloudinary(req.file.buffer, "event_gallery")

        const newItem = await Gallery.create({
            title,
            category,
            images: result.secure_url
        });

        res.status(201).json({message: "Gallery item added successfully", data: newItem});
        
    } catch (error) {
        res.status(500).json({message : "Server Error", error: error.message});
    }
};

export const getGalleries = async (req, res) => {
    try {
        const data = await Gallery.find().sort({createdAt: -1});
        res.json({ data });
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}