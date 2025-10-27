const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() =>{
        console.log("db connected succefully");
    })
    .catch((err) =>{
        console.log("db failed");
    })
}

module.exports = connectDB;