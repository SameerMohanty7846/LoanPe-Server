import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema(
  {
    // ✅ Fixed by applicant (User reference is fixed after submission)
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ Fixed: Which loan product this application is for.
    // (Comes directly from LoanProduct, cannot change after submission)
    loanProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanProduct",
      required: true,
    },

    // ✏️ Flexible before approval:
    // User can request how much to borrow (validated by product limits)
    amountRequested: {
      type: Number,
      required: true,
      min: 1,
    },

    // ✏️ Flexible before approval:
    // Duration user chooses within product’s allowed range
    durationInMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    // ✅ Fixed: Interest rate locked at application time
    // (comes from LoanProduct OR personalized by admin but then locked)
    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },

    // ✅ Fixed by system:
    // Status changes by system/admin, not applicant
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Disbursed", "Closed"],
      default: "Pending",
    },

    // ✅ To be manually set (no auto-calculation here)
    emiAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    // ✅ To be manually set (no auto-calculation here)
    totalPayable: {
      type: Number,
      min: 0,
      default: 0,
    },

    // ✅ To be manually set (no auto-calculation here)
    totalInterest: {
      type: Number,
      min: 0,
      default: 0,
    },

    // ✏️ Flexible for admin:
    // Admin may approve less than requested (final sanctioned amount)
    approvedAmount: {
      type: Number,
      min: 0,
      default: null,
    },

    // ✏️ Flexible always:
    // Applicant can add notes (like “need urgent processing”)
    applicantNotes: {
      type: String,
      trim: true,
      default: null,
    },

    // ✏️ Flexible always:
    // Admin remarks on application (“Approved after verification”)
    adminRemarks: {
      type: String,
      trim: true,
      default: null,
    },

    // ✅ Fixed once disbursed:
    // Date loan officially starts repayment cycle
    startDate: {
      type: Date,
      default: null,
    },
  },
  { strict: true, timestamps: true }
);

// === No pre-save middleware here ===

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema,
  "loanapplications"
);

export default LoanApplication;
