import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            dbName:'LoanPeDB'
        })
    }catch(err){
        console.log('error in connecting database',err)
    }
    console.log('database connected')
}

export default connectDb