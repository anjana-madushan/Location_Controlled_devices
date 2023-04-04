const Location = require("../model/location");

const addNewLocation = async(req, res, next)=>{

    const {name, address, phone, devices} = req.body;
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
        location = await Location.findById(id);
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

    let location;
    let device;

    try{
        location = await Location.findById(id)

        if(!location){
            res.status(404).json({message:"Not Found this Location"})
        }


        const {serialNumber, type, image, status} = req.body
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
        res.status.json({message:"Unable to delete the Location"})
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