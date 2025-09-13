import mongoose from "mongoose";

const LoanApplicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // reference to User collection
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanProduct",  // reference to LoanProduct collection
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    time: {
      type: Number,   // tenure in months (you prefer "time")
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const LoanApplication = mongoose.model(
  "LoanApplication",
  LoanApplicationSchema,
  'loanapplications'
);

export default LoanApplication;
