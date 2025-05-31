import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('✅ Centralized Gateway running...');
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Gateway running at http://localhost:${process.env.PORT}`);
});