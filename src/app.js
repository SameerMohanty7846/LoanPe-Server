
import express from 'express'
import userRoutes from './routes/UserRoutes.js';
const app=express()
app.use(express.json())
app.use('/auth',userRoutes)

export default app;
