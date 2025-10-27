const userModel = require("../models/user.model");
const FoodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { use } = require("react");
 
async function registerUser(request, response) {
    if(!request.body){
        return response.send("body is empty");
    }
    //console.log(request.body);
    const {fullname, email, password} = request.body;
    const userAlreadyExist = await userModel.findOne({
        email
    })
    if(userAlreadyExist){
        return response.status(400).json({
            message : "soory email already exist",
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        fullname,
        email,
        password : hashedPassword,
    })

    const token = jwt.sign({
        id : user._id,

    }, process.env.JWT_SECRET);

    response.cookie("token", token);
    response.status(201).json({
        message : "user registered succefully",
        user : {
            _id : user._id,
            email : user.email,
            fullname : user.fullname,
        }
    })
}

async function loginUser (request, response) {
    if(!request.body){
        return response.send("body is empty");
    }
    const {email, password} = request.body;
    const user = await userModel.findOne({
        email
    })
    if(!user){
        return response.status(400).json({
            message : "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(! isPasswordValid){
        return response.status(400).json({
            message : "invalid email or password"
        })
    }

    const token = jwt.sign({
        id : user._id,

    }, process.env.JWT_SECRET);

    response.cookie("token", token);
    response.status(201).json({
        message : "user logged in succefully",
        user : {
            _id : user._id,
            email : user.email,
            fullname : user.fullname,
        }
    })
}

async function logoutUser(request, response) {
    response.clearCookie("token");
    response.status(200).json({
        message : "log out user success"
    })
}

async function registerFoodPartner(request, response) {
    if(!request.body){
        return response.send("body is empty");
    }
    const {fullname, contactName, phone, address, email, password} = request.body;
    const userAlreadyExist = await FoodPartnerModel.findOne({
        email
    })
    if(userAlreadyExist){
        return response.status(400).json({
            message : "soory email already exist",
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await FoodPartnerModel.create({
        fullname, contactName, phone, address, email,
        password : hashedPassword,
    })

    const token = jwt.sign({
        id : user._id,

    }, process.env.JWT_SECRET);

    response.cookie("token", token);
    response.status(201).json({
        message : "user registered succefully",
        user : {
            _id : user._id,
            email : user.email,
            fullname : user.fullname,
            contactName : user.contactName,
            phone : user.phone,
            address : user.address,
        }
    })
}

async function loginFoodPartner (request, response) {
    if(!request.body){
        return response.send("body is empty");
    }
    const {email, password} = request.body;
    const user = await FoodPartnerModel.findOne({
        email
    })
    if(!user){
        return response.status(400).json({
            message : "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(! isPasswordValid){
        return response.status(400).json({
            message : "invalid email or password"
        })
    }

    const token = jwt.sign({
        id : user._id,

    }, process.env.JWT_SECRET);

    response.cookie("token", token);
    response.status(201).json({
        message : "user logged in succefully",
        user : {
            _id : user._id,
            email : user.email,
            fullname : user.fullname,
        }
    })
}

async function logoutFoodPartner(request, response) {
    response.clearCookie("token");
    response.status(200).json({
        message : "log out food partner success"
    })
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}