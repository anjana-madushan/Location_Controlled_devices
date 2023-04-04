const express = require("express")

const router = express.Router();

const location_controller = require("../controllers/location_controllers")
const Location = require("../model/location")

router.post('/addLocation', location_controller.addNewLocation);
router.get('/', location_controller.getLocations);
router.get('/:id', location_controller.getOneLocation);
router.put('/updateLocation/:id', location_controller.updateLocation);
router.delete('/deleteLocation/:id', location_controller.deleteLocation);
router.post('/:id/device/addDevice', location_controller.addDeviceToLocation);
router.delete('/:lId/device/:dId', location_controller.DeleteOneDevice);

module.exports=router;