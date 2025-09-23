import express from 'express'
import { createLoan, deleteLoan, getAllLoans, getLoanById, updateLoan } from '../controllers/loanProducts.controller.js';


const LoanRouter=express()
LoanRouter.post('/loans/createloan',createLoan)
LoanRouter.get('/loans/allloans',getAllLoans)
LoanRouter.get('/loans/:id',getLoanById)
LoanRouter.put('/loans/update/:id',updateLoan)
LoanRouter.delete('/loans/delete/:id',deleteLoan)

// http://localhost:7777/loanpe/loans/:id


export default LoanRouter;
