import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import path from 'path';

// Configure environment variables
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'client', 'build')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.use('*', function (req, res) {
    res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
});

// Rest API
app.get('/', (_req, res) => {
    res.send('<h1>Hello</h1>');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
