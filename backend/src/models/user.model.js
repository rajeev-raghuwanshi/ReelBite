const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        require: true,
        unique : true,
    },
    password : {
        type : String,
    }
},
{
    timestamps : true
}
)

const User = mongoose.model("User", UserSchema);

module.exports = User;