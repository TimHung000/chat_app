const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).catch((err) =>{
        console.log(err);
    })
}

module.exports = connectDB


// mongoose.connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (error) => {
//       if(error)
//         console.log(`MongoDB connection failed : ${error}`);
//       else
//         console.log("Connected to MongoDB");
//     }
//   );