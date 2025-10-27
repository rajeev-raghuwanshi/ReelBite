const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/food.model");

async function getFoodPartnerById(request, response) {
    foodPartnerId = request.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId});
    console.log(foodItemsByFoodPartner);
    if(!foodPartner){
        return response.status(404).json({
            message : "food partner not found",
        })
    }
    return response.status(200).json({
        message: "food partner retrived succesfully",
        foodPartner,
        foodItems : foodItemsByFoodPartner,
    })
}

module.exports = {
    getFoodPartnerById,
}