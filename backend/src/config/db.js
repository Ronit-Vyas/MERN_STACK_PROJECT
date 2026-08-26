import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    
    await mongoose.connect("mongodb://admin:qwerty@localhost:27017/notes?authSource=admin")

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
   
  }
};
