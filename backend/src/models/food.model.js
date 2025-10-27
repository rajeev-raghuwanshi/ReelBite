const mongoose = require("mongoose");
const FoodPartnerModel = require("./foodPartner.model");

const FoodModelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    video :{
        type : String,
        require: true,
    },
    description : {
        type : String,
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : FoodPartnerModel,
    },
    likeCount : {
        type : Number,
        default : 0,
    }

}
)

const FoodModel = mongoose.model("FoodModel", FoodModelSchema);

module.exports = FoodModel;