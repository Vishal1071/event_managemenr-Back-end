import User from '../models/UserModel.js'
import bcrypt from "bcrypt"


export const register = async (req, res) => {
    try {
        const { name, email, password, phone, gender } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are require" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name, email, password: hashedPassword, phone, gender
        })

        await user.save()

        return res.status(201).json({ message: "User Registered successfully", user })
    } catch (error) {
        console.error("while Error in code", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return res.status(400).json({ message: "User not found" });
        }

        console.log("✅ User found:", user.email, "Role:", user.role);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid password" })
        }

        const { password: _, ...userData } = user.toObject();

        const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();

        return res.status(200).json({
            message: "Login successfuly",
            user: userData,
            accessToken
        });

    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true,
            data: users,
            message: "All User Fetched Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user;

         if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own profile" });
        }

        const { name, email, password, gender, phone } = req.body;

        let updatedData = { name, email, gender, phone };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "USer not found" });
        }

        res.status(200).json({ message: "User Deleted successfully" })

    } catch (error) {
        console.error("Error Deleting USer ", error);
        return res.status(500).json({ message: "Server error" })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(400).json({ message: "Invalid token payload" });

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching profile', error);
        return res.status(500).json({ message: 'Server error' });
    }
}