const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).catch((err) =>{
        console.log(err);
    })
}

module.exports = connectDB