import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import websiteRouter from './routes/website.routes.js';
import billingRouter from './routes/billing.routes.js';
import { dodoWebhook } from './controllers/dodo.controller.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "https://webcraftai-kr9o.onrender.com",
    credentials: true
}))

// Middleware to capture raw body for webhook signature verification
app.use('/api/webhook', express.raw({type: 'application/json'}), (req, res, next) => {
    console.log("📨 Webhook middleware - Headers:", req.headers);
    console.log("📨 Body is Buffer:", Buffer.isBuffer(req.body));
    
    if (Buffer.isBuffer(req.body)) {
        req.rawBody = req.body.toString('utf-8');
        try {
            req.body = JSON.parse(req.rawBody);
            console.log("✅ Raw body captured and parsed successfully");
        } catch (e) {
            console.error("❌ Failed to parse raw body:", e.message);
            return res.status(400).json({ error: "Invalid JSON" });
        }
    }
    next();
});

app.post('/api/webhook', dodoWebhook);

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/website',websiteRouter);
app.use('/api/billing',billingRouter);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
  connectDB();
});
