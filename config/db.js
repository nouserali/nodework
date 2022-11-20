import mongoose from "mongoose";

const connectDB = async () => {
   const conn = await mongoose.connect(
    "mongodb+srv://Nouser:Ge9EQmvUOefrDOug@cluster0.bni3zgu.mongodb.net/",
    // "mongodb+srv://nouser:Husain7744@cluster0.bni3zgu.mongodb.net/coaching",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  console.log("Host----", conn.connection.host);
};

export default connectDB;
