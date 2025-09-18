import mongoose from "mongoose";

const loanProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    interestRate:{
        type:Number,// annual interest rate(%)
        required:true,
        min:0
    },
    duration:{
        type:Number ,//in months
        required:true,
        min:1,

    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    eligibilityCriteria:{
        type:String,
        required:true,
        trim:true,
        default:null,
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }



},{
    strict:true,
    timestamps:true
})


const LoanProduct=mongoose.model('loanproducts',loanProductSchema,'loanproducts')
export default LoanProduct