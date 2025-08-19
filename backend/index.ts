import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB';
import authRouter from './Routes/authRouter';

dotenv.config();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

// ✅ CORS Setup
const corsOptions = {
  origin: FRONTEND_URL,  
  credentials: true,    
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/', authRouter);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
