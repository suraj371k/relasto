import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db';

//routes
import userRoutes from './routes/user.routes'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser())

app.use(express.json()); 
app.use(cors())

//routes
app.use('/api/auth' , userRoutes)

//database connection
connectDB()


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
