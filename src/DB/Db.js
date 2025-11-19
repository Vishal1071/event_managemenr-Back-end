import mongoose from "mongoose";


const connectDB = async() =>{
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
        console.log(`🗄️ Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED", error);
        process.exit(1);
    }
}

export default connectDB;