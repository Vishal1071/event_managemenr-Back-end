import router from "./Router/UserRouter.js"
import contactRouter from "./Router/ContactRouter.js"
import AdminRouter from "./Router/AdminRouter.js"
import express from "express"
import cors from 'cors'


const app = express();

app.use(cors());


app.use(express.json());
app.use("/api/user", router);
app.use("/api/user", contactRouter);
app.use("/api/gallery", AdminRouter);

export {app}