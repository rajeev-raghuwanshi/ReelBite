const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(request, response, next) {
    const token = request.cookies.token;
    if(!token){
        return response.status(401).json({
            message : "please login as food partner first",
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        // request object has no such property foodPartner , we actually here creating a new property
        request.foodPartner = foodPartner;
        next();
    }
    catch(err){
        return response.status(401).json({
            message : "login credntials are invalid",
        })
    }
}

async function authUserMiddleware(request, response, next) {
    const token = request.cookies.token;
    if(!token){
        return response.status(401).json({
            message : "please login as user first",
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        // request object has no such property foodPartner , we actually here creating a new property
        request.user = user;
        next();
    }
    catch(err){
        return response.status(401).json({
            message : "login credntials are invalid",
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
}