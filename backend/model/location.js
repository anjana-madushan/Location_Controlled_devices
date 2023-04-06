const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const deviceSchema = new mongoose.Schema({
    serialNumber: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['pos', 'kiosk', 'signage'],
      required: true
    },
    image: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive']
    }
  });


const locationSchema = new Schema({
    name:{
        type:String,
        required:true
    }, 
    address:{
        type:String,
    }, 
    phone:{
        type:String
    }, 
    devices:[{
        type:deviceSchema
    }]

})

module.exports = mongoose.model("Location", locationSchema)
