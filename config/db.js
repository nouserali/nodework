import mongoose from "mongoose";

const connectDB = async () => {
   const conn = await mongoose.connect(
   "mongodb://localhost:27017/coaching",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  console.log("Host----", conn.connection.host);
};

export default connectDB;
