import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.DB_URI!,{
        dbName:"uber_clone"
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));
}

export default connectDB;