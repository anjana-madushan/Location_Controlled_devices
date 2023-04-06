const Location = require("../model/location");
const joi = require("joi")

const addNewLocation = async(req, res, next)=>{

    const {name, address, phone, devices} = req.body;

    if(!name){
        res.status(400).json({message:"You should enter the name of the location."})
    }

    const schema = joi.object({
        name:joi.string().required(),
        address:joi.string().required(),
        phone:joi.string().required(),
        devices:joi.array()
    })

    const {err, value} = schema.validate({name, address, phone, devices})

    if (err) {
        return res.status(400).json({ message: err.details[0].message });
    }

    let location;
    try{
        location = new Location({
            name, 
            address, 
            phone, 
            devices:devices
        });

    
        await location.save();
    }catch(err){
        console.log(err)
    }
    
    if(!location){
        res.status(500).json({message:"Unable to add a Location"})
    }
    else{
        res.status(200).json({message:"Location added successfully", location:location})
    }
    
}

const getLocations = async(req, res, next) => {

    let locations;

    try{
        locations = await Location.find();
    }catch(err){
        console.log(err)
    }

    if(!locations){
        res.status(404).json({message:"There are no locations added"})
    }
    else{
        res.status(200).json({locations})
    }

}


const getOneLocation = async(req, res, next) =>{

    const id = req.params.id;
    let location;

    try{
        location = await Location.findById(id).populate('devices');
        console.log(id)
        
    }catch(err){
        console.log(err)
    }

    if(!location){
        res.status(404).json({message:"There is not that location"})
    }else{
        res.status(200).json({location})
    }
}

const addDeviceToLocation = async(req, res, next) =>{
    const id = req.params.id;
    const {serialNumber, type, image, status} = req.body
    if(!serialNumber || !type || !image){
        res.status(400).json({message:"check serial no, type, or image fields cannot empty"})
    }
    let location;
    let device;

    const schema = joi.object({
        serialNumber:joi.string(),
        type:joi.string().valid('pos', 'kisok', 'signage'),
        image:joi.string(), 
        status:joi.string().valid('active', 'inactive')
    })

    const {err, value} = schema.validate({serialNumber, type, image, status})

    if (err) {
        return res.status(400).json({ message: err.details[0].message });
    }


    try{
        location = await Location.findById(id)

        if(!location){
            res.status(404).json({message:"Not Found this Location"})
        }

        const deviceExists = location.devices.some(
            (device) => device.serialNumber === serialNumber
          );
      
          if (deviceExists) {
            return res
              .status(400)
              .json({ message: "Device with this serial number already exists" });
          }

        device = {
            serialNumber, 
            type, 
            image, 
            status
        }

        location.devices.push(device)

        await location.save();
    }catch(err){
        console.log(err)
    }

    res.status(200).json({message:"One new deveice is added"})
}

const DeleteOneDevice = async(req, res, next) =>{
    const lId = req.params.lId;
    const dId = req.params.dId;

    let location;
    let device;

    try{
        location = await Location.findById(lId)

        if(!location){
            res.status(404).json({message:"Not Found this Location"})
        }

        device = location.devices.id(dId);

        if(!device){
            res.status(404).json({message:"Not Found this Device in this location"})
        }else{
            location.devices.splice(location.devices.indexOf(device), 1)
            await location.save()
            res.status(200).json({message:"Device is removed from this Location"})
        }

    }catch(err){
        console.log(err)
    }

   
}

const updateLocation = async(req, res, next) => {

    const id = req.params.id;

    let location;

    try{
        location = await Location.findByIdAndUpdate(id, req.body, {new:true})
    }catch(err){
        console.log(err)
    }

    if(!location){
        res.status.json({message:"Unable to update Location details"})
    }
    else{
        res.status(200).json({message:"Location Updated successfully"})
    }
}

const deleteLocation = async(req, res, next) =>{

    const id = req.params.id;
    let location;

    try{
        location = await Location.findByIdAndDelete(id)
    }catch(err){
        console.log(err)
    }

    if(!location){
        res.status(400).json({message:"Unable to delete the Location"})
    }
    else{
        res.status(200).json({message:"Location deleted successfully"})
    }
}

exports.addNewLocation = addNewLocation
exports.getLocations = getLocations
exports.getOneLocation = getOneLocation
exports.updateLocation = updateLocation
exports.deleteLocation = deleteLocation
exports.addDeviceToLocation = addDeviceToLocation
exports.DeleteOneDevice = DeleteOneDevice