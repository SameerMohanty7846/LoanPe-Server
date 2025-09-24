import LoanApplication from '../models/LoanApplication.js'

// Apply for a new loan
export const applyLoan = async (req, res) => {
  try {
    const { applicant, loanProduct, amountRequested, durationInMonths, applicantNotes } = req.body;

    if (!applicant || !loanProduct || !amountRequested || !durationInMonths) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Optional: compute EMI, totalPayable, totalInterest manually if needed here
    // For now, we leave them 0 as per schema

    const newApplication = await LoanApplication.create({
      applicant,
      loanProduct,
      amountRequested,
      durationInMonths,
      applicantNotes
    });

    res.status(201).json({
      status: 'success',
      message: 'Loan application submitted',
      application: newApplication
    });

  } catch (err) {
    console.log('Error in applying loan', err);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

// Get all loan applications
export const getAllLoanApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find()
      .populate('applicant', 'name email')
      .populate('loanProduct', 'productName interestRate duration');

    res.status(200).json(applications);

  } catch (err) {
    console.log('Error in fetching loan applications', err);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

// Get loan application by ID
export const getLoanApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await LoanApplication.findById(id)
      .populate('applicant', 'name email')
      .populate('loanProduct', 'productName interestRate duration');

    if (!application) {
      return res.status(404).json({
        message: "Loan Application Not Found"
      });
    }

    res.status(200).json(application);

  } catch (err) {
    console.log('Error in getting loan application details', err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// Update loan application status
export const updateLoanApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Value"
      });
    }

    const application = await LoanApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated document
    );

    if (!application) {
      return res.status(404).json({
        message: "Loan Application not found"
      });
    }

    res.status(200).json({
      message: `Loan application ${status.toLowerCase()} successfully`,
      data: application
    });

  } catch (err) {
    console.log('Error in updating loan application', err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// Delete a loan application
export const deleteLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await LoanApplication.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Loan application not found"
      });
    }

    res.status(200).json({
      message: "Loan application deleted successfully",
      deletedApplication,
    });

  } catch (err) {
    console.log('Error in deleting loan application', err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}


//  http://localhost:7777/loanpe/loanapplications/apply
//  http://localhost:7777/loanpe/loanapplications/allapplications
