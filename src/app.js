import express from 'express'
import userRouter from './routes/UserRoutes.js';
import LoanRouter from './routes/LoanRoutes.js';
import LoanApplicationRoutes from './routes/LoanApplicationRoutes.js';
import cors from 'cors';

const app=express()
app.use(express.json())
// ✅ Add this before routes

// (Optional) Restrict to specific origin:
app.use(cors({
  origin: '*', // your React frontend URL
  methods: 'GET,POST,PUT,DELETE',
}));




app.use('/loanpe',userRouter)
app.use('/loanpe',LoanRouter)
app.use('/loanpe',LoanApplicationRoutes)




export default app;