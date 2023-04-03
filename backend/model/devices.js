const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    SerialNo:{
        type:String,
        required:true, 
        unique:true
    }, 
    type:{
        type:String,
        enum:["pos", "kiosk", "signage"],
        required:true
    }, 
    image:{
        type:String,
        unique : true
    },
    status:{
        type:String,
        enum:["active", "inactive"]
    }

})

module.exports = mongoose.model("Devices", deviceSchema)