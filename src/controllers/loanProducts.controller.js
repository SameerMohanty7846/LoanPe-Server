import LoanProduct from '../models/LoanProduct.js'


export const createLoan= async (req,res)=>{
   try{
     const{productName,interestRate,duration,description,eligibilityCriteria}=req.body
    //empty validation
    if(!productName || !interestRate ||!duration ||!description || !eligibilityCriteria){
        return res.status(400).json({
            message:'All fields are required',

        })
    }

    const createdLoan=await LoanProduct.create({
        productName,interestRate,duration,description,eligibilityCriteria})
    
    res.status(201).json({
        status:"success",
        message:'Loan Product Created Successfully',
        data:createLoan
    })

   }catch(error){
    console.error('Error creating loan',MediaError)
      res.status(500)
      .json({
        message:'Internal Server Error'
      }) 
   }
}
export const getAllLoans=async (req,res)=>{
    try{
        const loans=await LoanProduct.find();
        res.status(200).json({
            status:"success",
            message:"Loan fetched Sucessfully",
            data:loans
        })

    }catch(error){
        console.log(`Error in fetching details`,error)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }

}
export const getLoanById=async (req,res)=>{
    try{
        const {id}=req.params
        const loan=await LoanProduct.findById(id)
        if(!loan){
            return res.status(404).json({
                message:"Loan Does not exist"

            })
        }
        res.status(200).json({
            status:"success",
            message:"Data fetched successfully",
            data:loan,

        })

    }
    catch(error){
        console.log(`Error in getting the user`,err)
        res.status(500).json({
            message:'internal server error'
        })
    }

}
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;

    // directly take whatever fields user sent in req.body
    const updateData = req.body;

    // if no fields are sent at all
    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        message: "At least one field is required to update",
      });
    }

    const updatedLoan = await LoanProduct.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,          // return the updated document
        runValidators: true // ensure validation rules still apply
      }
    );

    if (!updatedLoan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    res.status(200).json({
      message: "Loan Updated Successfully",
      data: updatedLoan,
    });

  } catch (error) {
    console.log("error in update", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const toggleLoanStatus=async (req,res)=>{
    try{
        const{id}=req.params;
        const loan= await LoanProduct.findById(id)
        if(!loan){
            return res.status(404).json({ message: "Loan not found" });
        }
        loan.isActive= !loan.isActive;
        await loan.save();//updates only the fields required and it is a object method

        res.status(200).json({
            message:"loan status updated",
            data:loan
        })

    }catch(error){
        console.log(`error in toggling status`,err)
        res.status(500),json({
            message:"Internal Server Error"
        })
    }

}
export const deleteLoan=async (req,res)=>{
    try{
        const{id}=req.params;
        const deletedLoan=  await LoanProduct.findByIdAndDelete(id);
        if(!deletedLoan){
            return res.status(404).json({
                message:"Loan Not Found"
            })
        }


    }catch(error){
        console.log('error in deleting loan',err)
        res.status(500).json({
            message:"Internas Server Error"
        })
    }

}