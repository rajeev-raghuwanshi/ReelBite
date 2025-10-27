const mongoose = require( 'mongoose' );
const User = require("./user.model");
const FoodModel = require("./food.model");
const LikeSchema = new mongoose.Schema ({
    user: {
        type: mongoose. Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: FoodModel,
        required: true
    },
}, {
         timestamps: true
    })
const Like = mongoose.model('Like', LikeSchema) ;
module.exports = Like;