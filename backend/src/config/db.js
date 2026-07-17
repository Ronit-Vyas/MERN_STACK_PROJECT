import mongoose from 'mongoose';


export const connectDB = async () => {
  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/notes")
    
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
   
  }
};
