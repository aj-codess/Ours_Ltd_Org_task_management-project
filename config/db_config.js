import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri=process.env.MONGO_URI;

const connectDB = async () => {
    try {
        
        if(!mongoUri){
            throw new Error("MongoDB URI is not defined in environment variables");
        };

        await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};


const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB disconnected successfully");
    } catch (error) {
        console.error("Error disconnecting from MongoDB: ", error.message);
    }
}


export default {
    connectDB,
    disconnectDB,
};