const FoodModel = require("../models/food.model");
const { v4 : uuid} = require("uuid");
const storageServices = require("../services/storage.service");
const likeModel = require("../models/likes.model");

async function createFood(request, response) {
    // console.log(request.foodPartner); // this value will be undefined if we wont use middleware
    //console.log("belwo is body");
    // console.log(request.body);
    // console.log(request.file);
    const fileUploadResult = await storageServices.uploadFile(request.file.buffer, uuid());
    // console.log(fileUploadResult); 
    const foodItem = await FoodModel.create({
        name : request.body.name,
        video : fileUploadResult.url,
        description : request.body.description,
        foodPartner : request.foodPartner._id,
    })
    console.log(foodItem);
    response.send("food item created");
}

async function getFoodItems(request, response){
    const foodItem = await FoodModel.find({});
    response.status(201).json({
        message : "all food items found",
        foodItem,
    })
}

async function likeFood(request, response){
    const {foodId} = request.body;
    const user = request.user;
    const isAlreadyLiked = await likeModel.findOne({
        user : user._id,
        food : foodId,
    })

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user : user._id,
            food : foodId,
        })
        await FoodModel.findByIdAndUpdate(foodId, {
            $inc : {likeCount : - 1},
        })
        return response.status(200).json({
            message : "video unliked success",
        })
    }

    const like =  await likeModel.createOne({
        user : user._id,
        food : foodId,
    })
    await FoodModel.findByIdAndUpdate(foodId, {
            $inc : {likeCount : + 1}
    })
    return response.status(200).json({
        message : "video liked success",
        like,
    })
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
}