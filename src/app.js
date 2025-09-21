import express from 'express'
import userRouter from './routes/UserRoutes.js';
import LoanRouter from './routes/LoanRoutes.js';
import LoanApplicationRoutes from './routes/LoanApplicationRoutes.js';
import cors from 'cors';
import authRouter from './routes/AuthRoutes.js';

const app=express()
app.use(express.json())
// ✅ Add this before routes

// (Optional) Restrict to specific origin:
app.use(cors({
  origin: 'http://localhost:5173', // your React dev URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,               // allow cookies/JWT to be sent
}));





app.use('/loanpe',userRouter)
app.use('/loanpe',LoanRouter)
app.use('/loanpe',LoanApplicationRoutes)
app.use('/loanpe',authRouter)




export default app;