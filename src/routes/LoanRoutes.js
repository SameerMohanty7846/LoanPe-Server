import express from 'express'
import { createLoan, deleteLoan, getAllLoans, getLoanById, updateLoan } from '../controllers/loanProducts.controller.js';


const LoanRouter=express()
LoanRouter.post('/loan/createloan',createLoan)
LoanRouter.get('/loan/getall',getAllLoans)
LoanRouter.get('/loan/getloand/:id',getLoanById)
LoanRouter.put('/loans/update/:id',updateLoan)
LoanRouter.delete('/loans/delete/:id',deleteLoan)


export default LoanRouter;
