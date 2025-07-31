import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'

// Routes
import userRoutes from './routes/user.routes'
import propertyRoutes from './routes/property.routes'
import contactRoutes from './routes/contact.routes'

const app = express()
const PORT = process.env.PORT || 5000

// Cookie parser must come before routes
app.use(cookieParser())

// Correct placement of express.json for parsing req.body
app.use(express.json())

// Allow specific origins and send credentials
app.use(cors({
  origin: "https://relasto-one.vercel.app",
  credentials: true
}))

// Routes (must come after middleware)
app.use('/api/auth', userRoutes)
app.use('/api/property', propertyRoutes)
app.use('/api/contact', contactRoutes)

// DB connection
connectDB()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
