// this file is responsible for starting the server
const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/db/db");
const port = 3000;
connectDB();
app.listen(port, () =>{
    console.log("app is listening")
})