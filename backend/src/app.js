// the server will be created in this file
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))
app.use(cookieParser());
app.get('/', (request, response) =>{
    console.log(process.env.IMAGEKIT_PRIVATE_KEY);
    console.log(process.env.IMAGEKIT_PUBLIC_KEY);
    response.send("hello world");
})

app.use("/api/auth", authRoutes );
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);
module.exports = app;