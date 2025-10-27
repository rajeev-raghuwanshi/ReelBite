const mongoose = require("mongoose");

const FoodPartnerSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    contactName : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,    
    },
    address : {
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

const FoodPartnerModel = mongoose.model("FoodPartnerModel", FoodPartnerSchema);

module.exports = FoodPartnerModel;