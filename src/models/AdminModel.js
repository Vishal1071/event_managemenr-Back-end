import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    images: {
        type: String,
        required: [true, "Images are required"]
    },
},{timestamps: true});

export default mongoose.model("Gallery", gallerySchema);