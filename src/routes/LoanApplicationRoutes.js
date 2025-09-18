import express from 'express'
import { applyLoan, deleteLoanApplicationStatus, getAllLoanApplications, getLoanApplicationByid, updateLoanApplicationStatus } from '../controllers/loanApplications.controller.js'

const LoanApplicationRoutes =express.Router()
LoanApplicationRoutes.post('/loanapplications/apply',applyLoan)
LoanApplicationRoutes.get('/loanapplications/allapplications',getAllLoanApplications)
LoanApplicationRoutes.patch('/loanapplications/update/:id',updateLoanApplicationStatus)
LoanApplicationRoutes.delete('/loanapplications/delete/:id',deleteLoanApplicationStatus)
LoanApplicationRoutes.get('/loanapplications/:id',getLoanApplicationByid)


export default LoanApplicationRoutes