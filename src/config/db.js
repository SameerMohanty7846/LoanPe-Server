import mongoose  from "mongoose";
const connectDb=async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            dbName:'LoanPeDB'
        })
    }catch(err){
        console.log(`problem in connecting database`)
    }
    console.log('database connected')
}

export default connectDb;