import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Static files from /uploads (inside /backend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

app.listen(port, () => {
    console.log("Server is running on the PORT:", port);
})