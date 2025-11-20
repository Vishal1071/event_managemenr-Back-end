import express from "express"
import {register, login, getAllUsers, updateUser, deleteUser, getProfile, uploadProfilepic } from "../controllers/UserController.js"
import upload from "../middleware/multer.js"
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// Get all User
router.get("/getAllUser", verifyToken, getAllUsers);

// Get logged-in user's profile
router.get("/profile", verifyToken, getProfile);

// Update User
router.put("/updateUser/:id", verifyToken, updateUser);

// Delete User 
router.delete("/deleteUser/:id", verifyToken, isAdmin, deleteUser);

// Upload Profile Picture
router.post("/uploadProfilePic/:id", verifyToken, upload.single("avatar"), uploadProfilepic);

export default router  