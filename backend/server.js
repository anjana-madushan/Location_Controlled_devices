const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const locationRouter = require("./routes/location_routes")
const deviceRouter = require("./routes/device_routes")
const cors = require("cors");
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use("/location", locationRouter)
app.use("/device", deviceRouter)

PORT = 8000;
const link = "mongodb+srv://layoutIndex:T55HtCNUDCAgTn4k@locationdevices.zwffgli.mongodb.net/LocationDevices?retryWrites=true&w=majority"

mongoose.connect(link).then(()=>console.log("Connected to Database"))
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`The Server is running on ${PORT}`);
    })
}).catch((err)=>{console.log(err)})

