import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        //retrieving json data
        const { name, email, phone, password, role } = req.body;
        console.log(req.body);

        // empty  validation
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        //check for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email or Phone already exist"
            })
        }
        //createing salt and hasing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user

        const created = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'user'
        })


        console.log(`user registered`)
        res.status(201).json({
            status: "success",
            message: "user created successfully",
            data: {
                name: created.name,
                email: created.email,
                phone: created.phone,
                role: created.phone
            }
        });
    }
    catch (err) {
        console.log('internal server error', err)
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password")//exclude password
        //


        res.status(200).json({
            status: "success",
            message: "data fetched successfully",
            data: users
        })

    } catch (err) {
        console.log('internal server error', err)
        res.status(500).json({
            status: "failure",
            message: "error in fetching data"

        })
    }

}
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(404).json({
                'message': "User Not Found"
            })
        }

        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({
            'message': "internal server error"
        })
    }

}





// Controller to update user
export const updateCompleteUser = async (req, res) => {
  try {
    // Use ID from authMiddleWare
    const id = req.user.id;

    // Find user first
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      name,
      email,
      phone,
      aadhaarNumber,
      panNumber,
      idProofType,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      branchName,
      upiId,
      employmentType,
      companyName,
      monthlyIncome,
      address,
    } = req.body;

    // Check for existing email or phone (exclude current user)
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const phoneExists = await User.findOne({ phone, _id: { $ne: id } });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone already in use" });
    }

    // Update basic fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.aadhaarNumber = aadhaarNumber || user.aadhaarNumber;
    user.panNumber = panNumber || user.panNumber;
    user.idProofType = idProofType || user.idProofType;
    user.bankName = bankName || user.bankName;
    user.accountHolderName = accountHolderName || user.accountHolderName;
    user.accountNumber = accountNumber || user.accountNumber;
    user.ifscCode = ifscCode || user.ifscCode;
    user.branchName = branchName || user.branchName;
    user.upiId = upiId || user.upiId;
    user.employmentType = employmentType || user.employmentType;
    user.companyName = companyName || user.companyName;
    user.monthlyIncome = monthlyIncome || user.monthlyIncome;
    user.address = address || user.address;

    // Update files if uploaded
    if (req.files) {
      if (req.files.profilePic) user.profilePic = req.files.profilePic[0].path;
      if (req.files.idProofFront) user.idProofFront = req.files.idProofFront[0].path;
      if (req.files.idProofBack) user.idProofBack = req.files.idProofBack[0].path;
      if (req.files.incomeProof) user.incomeProof = req.files.incomeProof[0].path;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};




// Check if current user's account is complete
export const checkAccountCompletion = async (req, res) => {
  try {
    const userId = req.user.id; // from AuthMiddleware

    const user = await User.findById(userId).select(
      "-password -__v"
    ); // exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      isKycCompleted: user.isKycCompleted,
      profileCompletionPercentage: user.profileCompletionPercentage,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};








//http://localhost:7777/loanpe/loans/update/68cb659607543be5bf98283d
//http://localhost:7777/loanpe/users/login
//http://localhost:7777/loanpe/users/register 
//http://localhost:7777/loanpe/users/check-completion