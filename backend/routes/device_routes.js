const express = require("express")

const router = express.Router();

const device_controller = require("../controllers/device_controllers")

router.post('/addDevice',device_controller.addDevice);
router.get('/', device_controller.getDevices);
router.get('/:id', device_controller.getOneDevice);
router.put('/updateDevice/:id', device_controller.updateDevice);
router.delete('/deleteDevice/:id', device_controller.deleteDevice);
module.exports=router;