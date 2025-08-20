// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from './routes/user.routes.js';
import messageRoute from "./routes/message.route.js";
import { app,server }  from "./SocketIO/server.js";


dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3002", // or your React app's port
  credentials: true               // ✅ allow cookies
}));

const port = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try{
    mongoose.connect(URI)
    console.log("Connected to MongoDB")

} catch (error) {
    console.log(error);

}
 app.use("/api/user", userRoutes);
 app.use("/api/message", messageRoute);
// Define a route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
