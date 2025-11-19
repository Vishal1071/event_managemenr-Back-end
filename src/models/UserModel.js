import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is require"]
    },
    email: {
        type: String,
        required: [true, "email is require"],
        unique: true 
    },
    password: {
        type: String,
        required: [true, "password is require"]
    },
    phone: {
        type: String,
        default: "", 
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2d"
        }
    );
};


// userSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         {
//             _id: this._id
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: "7d"
//         }
//     );
// };

const User = mongoose.model("User", userSchema);
export default User;