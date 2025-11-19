import express from "express";
import {contact, getAllContact} from "../controllers/UserContactController.js"

const contactRouter = express.Router();

// send contact detail
contactRouter.post("/contact", contact);

//get all contact list
contactRouter.get("/getAllContact", getAllContact);

export default contactRouter;