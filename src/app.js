import express from 'express'
import userRouter from './routes/UserRoutes.js';
import LoanRouter from './routes/LoanRoutes.js';

const app=express()
app.use(express.json())
app.use('/loanpe',userRouter)
app.use('/loanpe',LoanRouter)


export default app;