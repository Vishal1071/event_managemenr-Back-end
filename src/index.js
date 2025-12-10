import dotenv from "dotenv"
import connectDB from "./DB/Db.js";
import { app } from "./app.js";


dotenv.config();

const PORT = process.env.PORT || 8080;
await connectDB();


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 