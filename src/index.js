import express from "express"
import dotenv from "dotenv"
import connectDB from "./DB/Db.js";
import router from "./Router/UserRouter.js"
import contactRouter from "./Router/ContactRouter.js"
import cors from 'cors'

dotenv.config();
const app = express();

const PORT = process.env.PORT;
await connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/user", router)
app.use("/api/user", contactRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 