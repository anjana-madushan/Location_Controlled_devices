const Location = require("../model/location");

const addNewLocation = async(req, res, next)=>{

    const {name, address, phone} = req.body;
    let location;
    try{
        location = new Location({
            name, 
            address, 
            phone
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