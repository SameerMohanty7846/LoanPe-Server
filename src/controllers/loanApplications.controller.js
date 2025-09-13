import LoanApplication from '../models/LoanApplication.js'

export const applyLoan = async (req, res) => {
    try {
        const { applicant, product, requestedAmount, time } = req.body;
        if (!applicant || !product || !requestedAmount || !time) {
            return res.status(400).json({
                message: 'all fields are required'
            })
        }
        const newApplication = await LoanApplication.create({
            applicant,
            product,
            requestedAmount,
            time,

        })
        res.status(201).json({
            status: 'success',
            message: 'loan application submitted',
            application: newApplication

        })



    } catch (err) {
        console.log(`error in applying loan`, err)
        res.status(500)
        json({
            message: "Internal Server Error"
        })
    }

}
export const getAllLoans = async (req, res) => {
    try {
        const applications = await LoanApplication.find()
            .populate("applicant", "name email")
            .populate("product", "productName interestRate");

        res.status(200).json(applications)


    } catch (err) {
        console.log(`error in fetchin loan applications`, err)
        res.status(500)
        json({
            message: "Internal Server Error"
        })
    }
}
export const updateLoanStatus = async (req, res) => {
    try {
        const{id}=req.params;
        const{status}=req.body;

        if(!["APPROVED", "REJECTED"].includes(status)){
            return res.status(400).json({
                message:"Invalid Status Value"
            })
        }

        const application=await LoanApplication.findByIdAndUpdate(
            id,
            {status},
            {new :true}//returns new updated document because by default it returns the old document so that

        )
        if(!application){
            return res.status(404).json({
                message:"Loan Application not found"
            })
        }
        res.status(200).json({
            message:`Loan application ${status.toLowerCase()} successfully`,
            data:application
        })

    } catch (err) {
        console.log(`error in updating loan application`, err)
        res.status(500)
        json({
            message: "Internal Server Error"
        })
    }
}
export const deleteLoanApplicationStatus = async (req, res) => {
    try {
        const{id}=req.params;
        const deletedApplication=await LoanApplication.findByIdAndDelete(id);
        if(!deletedApplication){
            return res.status(404).
            json({
                message:"Loan application not found"

            })
        }

        res.statys(200).json({
            message:"Loan application deleted successfully",
            deletedApplication,

        })


    } catch (err) {
        console.log(`error in deleting loan applications `, err)
        res.status(500)
        json({
            message: "Internal Server Error"
        })
    }
}
export const getLoanApplicationByid = async (req, res) => {
    try {
        const{id}=req.params;
        const application=await 
        LoanApplication.findById(id)
                        .populate("applicant","name email")
                        .populate("product","productName interestRate")
                        if(!application){
                            return res.status(404).json({
                                message:"Loan Application Not Found"
                            })
                        }

    } catch (err) {
        console.log(`error in getting loan application details`, err)
        res.status(500)
        json({
            message: "Internal Server Error"
        })
    }
}