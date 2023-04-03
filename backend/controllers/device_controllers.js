const Device = require("../model/devices");

const addDevice = async(req, res, next) =>{

    const {SerialNo, type, image, status} = req.body;

    let device;

    try{
        device = new Device({
            SerialNo,
            type,
            image,
            status
        })

        await device.save();
    }catch(err){
        console.log(err)
    }

    if(!device){
        res.status(500).json({message:"Unable to add a Device"})
    }else{
        res.status(200).json({message:"Device added succesfully", device})
    }
}

const getDevices = async(req, res, next) =>{

    let devices;

    try{
        devices = await Device.find()
    }catch(err){
        console.log(err)
    }

    if(!devices){
        res.status(404).json({message:"There are not any devices"})
    }else{
        res.status(200).json({devices})
    }
}

const getOneDevice = async(req, res, next) =>{

    const id = req.params.id;
    let device;

    try{
        device = await Device.findById(id)
    }catch(err){
        console.log(err)
    }

    if(!device){
        res.status(404).json({message:"There is not that device"})
    }else{
        res.status(200).json({device})
    }
}

const updateDevice = async(req, res, next) =>{
 
    const id = req.params.id;
    let device;

    try{
        device = await Device.findByIdAndUpdate(id, req.body, {new:true})
    }catch(err){
        console.log(err)
    }

    if(!device){
        res.status(404).json({message:"Unable to update this device"})
    }else{
        res.status(200).json({message:"Device Upadated successfully"})
    }
}

const deleteDevice = async(req, res, next) =>{
 
    const id = req.params.id;
    let device;

    try{
        device = await Device.findByIdAndDelete(id)
    }catch(err){
        console.log(err)
    }

    if(!device){
        res.status(404).json({message:"Unable to delete this device"})
    }else{
        res.status(200).json({message:"Device deleted successfully"})
    }
}

exports.addDevice = addDevice
exports.getDevices = getDevices
exports.getOneDevice = getOneDevice
exports.updateDevice = updateDevice
exports.deleteDevice = deleteDevice