import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // KYC Info
    aadhaarNumber: { type: String },
    panNumber: { type: String },
    idProofType: {
      type: String,
      enum: ["Aadhaar", "PAN", "Passport", "VoterID", "DrivingLicense"],
    },
    idProofFront: { type: String }, // file URL
    idProofBack: { type: String },  // file URL

    // Profile Picture
    profilePic: { type: String }, // file URL for profile picture

    // Bank Details
    bankName: { type: String },
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branchName: { type: String },
    upiId: { type: String },

    // Employment/Income
    employmentType: {
      type: String,
      enum: ["Salaried", "Self-Employed", "Unemployed", "Student"],
    },
    companyName: { type: String },
    monthlyIncome: { type: Number },
    incomeProof: { type: String }, // file URL

    // Address (single string)
    address: { type: String }, // e.g. "123 Street, Mumbai, Maharashtra, 400001, India"

    // Profile Completion
    isKycCompleted: { type: Boolean, default: false },
    profileCompletionPercentage: { type: Number, default: 0 },
  },
  { strict: true }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
