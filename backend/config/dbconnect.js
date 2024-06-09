import mongoose from "mongoose"

// const connection = {};

// export const connectToDb = async () => {
//   try {
//     if(connection.isConnected) {
//       console.log("Using existing connection");
//       return;
//     }
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
 
//   } catch (error) {
//     console.log("error in conecting to db..");
//     throw new Error(error);
//   }
// };

 const dbConnect=async()=>{
  try {
     await mongoose.connect(process.env.MONGO,{
      useNewUrlParser:true,
      useUnifiedTopology:true
     })
     console.log("connect to db ...")
  } catch (error) {
       console.log("error in connect to db..")
       console.log(error)
  }
}

export default dbConnect;