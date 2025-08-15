import express from 'express';
import dotenv from  'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookiesParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});