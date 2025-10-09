import express from 'express';
import userRouter from './routes/UserRoutes.js';
import LoanRouter from './routes/LoanRoutes.js';
import LoanApplicationRoutes from './routes/LoanApplicationRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

// Body parsing
app.use(express.json());

// CORS
app.use(cors({
  origin: 'http://localhost:5173', // your React dev URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,               // allow cookies/JWT to be sent
}));

app.use(cookieParser());

// Serve uploaded files statically
// Example: public/uploads/users/profilePic.jpeg can be accessed via http://localhost:5000/uploads/users/profilePic.jpeg
app.use('/uploads', express.static(path.join(path.resolve(), 'public/uploads')));

// Routes
app.use('/loanpe', userRouter);
app.use('/loanpe', LoanRouter);
app.use('/loanpe', LoanApplicationRoutes);
app.use('/loanpe', authRouter);

// Global error handler (optional, catches multer errors etc.)
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});

export default app;
