import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios' 
import {useNavigate, useParams} from "react-router-dom"
import './styles/styles.css'

import swal from 'sweetalert';

const AddDevice = () => {
    const navigate = useNavigate();
    const {locationId} = useParams();

console.log(locationId)

   const [serialNumber, setserialNumber] = useState('')
   const [type, setType] = useState('')
   const [image, setImage] = useState('')
   const [status, setStatus] = useState('')
   const [location, setLocation] = useState(null)

   useEffect(()=>{
    const getLocation = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/location/${locationId}`);
            setLocation(response.data.location)
          } catch (err) {
            console.log(err)
          }
        }
    getLocation()
}, [locationId])


   const handleSubmit = async(e) => {
    e.preventDefault();


  
      // Check if the serial number already exists in the devices array
      const isSerialNumberExists = location.devices.some(device => device.serialNumber === serialNumber)
      if (isSerialNumberExists) {
        swal({
          title:"Check the serail No. This device already in this location",
        icon:"error"})
        return
      }

    const device = {serialNumber, type, image, status}

    if(!serialNumber||!type||!image||!status){
      swal({
        title:"Please Fill all the input fields",
        icon:"warning"
      })
      return;
    }

    await axios.post(`http://localhost:8000/location/${locationId}/device/addDevice`, device).then(()=>{

    swal({
      title:"Device added to the location.",
      icon:"success"
    })
        
        navigate("/");
      }).catch((err)=>{
        alert(err);
      })

   }

  return (
    <div className='form' onSubmit={handleSubmit}>
      <form>
    <div className="form-group">
      <label htmlFor="serialNumber">Serial Number</label>
      <input 
       type="text" onChange = {(e)=>setserialNumber(e.target.value)} value={serialNumber} name='serialNumber' className="form-control" id="serialNumber"  placeholder="Enter serialNumber"/>
    </div>
    
    <div className="form-group">
      <label htmlFor="Type">Type</label>
      <select onChange = {(e)=>setType(e.target.value)} value={type} name='type' className="form-control" id="type" placeholder="Enter type">
            <option>Select a Type</option>
            <option value="pos">POS</option>
            <option value="kiosk">KIOSK</option>
            <option value="signage">SIGNAGE</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="image">Image</label>
      <input 
      type="text" onChange = {(e)=>setImage(e.target.value)} value={image} name='image' className="form-control" id="image" placeholder="Enter Image"/>
    </div>

    <div className="form-group">
      <label htmlFor="image">Status</label>
      <select onChange = {(e)=>setStatus(e.target.value)} value={status} name='status' className="form-control" id="status" placeholder="Enter Status">
            <option>Select the Status of the device</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
      </select>
    </div>
<br/>

     <button type="submit" className="btn btn-primary">ADD DEVICE</button>
  </form>
  </div>
  )
}

export default AddDevice