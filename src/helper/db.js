import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sideffectking:2658CEPB1vf3Ljwb@cluster0.ija3rfa.mongodb.net/expense-tracker';


const dbConnect = async () => {
  try{
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn;

  }catch(error){
    console.log("Error: ", error)
  }
}

export default dbConnect;