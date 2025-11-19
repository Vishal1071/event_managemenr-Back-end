import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: [true, "name is require"]
    },
    email: {
        type: String,
        require: [true, "email is must require"] 
    },
    phonenumber: {
        type: Number,
        require: [true, "phone number is require"]
    },
    messege: {
        type: String,
        require: [true, "messege is require"]
    }

})

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;