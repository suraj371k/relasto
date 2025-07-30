import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db';

//routes
import userRoutes from './routes/user.routes'
import propertyRoutes from './routes/property.routes'
import contactRoutes from './routes/contact.routes'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser())

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin); 
  },
  credentials: true
}))


//routes
app.use('/api/auth' , userRoutes)
app.use('/api/property' , propertyRoutes)
app.use('/api/contact' , contactRoutes)

//database connection
connectDB()


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
