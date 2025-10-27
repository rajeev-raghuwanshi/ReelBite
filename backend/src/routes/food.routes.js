const express = require("express");
const multer = require("multer");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
// const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
});
// post api - the prefix /api/food is alredy include. [protected] with the help of middleware
                                // the file in the front-end should be video, if here it is video
router.post("/", authMiddleware.authFoodPartnerMiddleware,  upload.single("video"), foodController.createFood);

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);
router.post("/like", authMiddleware.authFoodPartnerMiddleware, foodController.likeFood);
module.exports = router;