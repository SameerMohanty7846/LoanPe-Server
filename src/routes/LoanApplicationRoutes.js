import express from 'express';
import {
  applyLoan,
  deleteLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplicationStatus
} from '../controllers/loanApplications.controller.js';

const LoanApplicationRoutes = express.Router();

// Apply for a new loan
LoanApplicationRoutes.post('/loanapplications/apply', applyLoan);

// Get all loan applications
LoanApplicationRoutes.get('/loanapplications/allapplications', getAllLoanApplications);

// Get a specific loan application by ID
LoanApplicationRoutes.get('/loanapplications/:id', getLoanApplicationById);

// Update loan application status (Approved/Rejected)
LoanApplicationRoutes.patch('/loanapplications/update/:id', updateLoanApplicationStatus);

// Delete a loan application
LoanApplicationRoutes.delete('/loanapplications/delete/:id', deleteLoanApplication);

export default LoanApplicationRoutes;
