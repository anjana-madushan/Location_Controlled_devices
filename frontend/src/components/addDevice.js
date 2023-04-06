import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import {useNavigate, useParams} from "react-router-dom"
import './styles/styles.css'

const AddDevice = () => {
    const navigate = useNavigate();
    const {locationId} = useParams();

console.log(locationId)

   const [serialNumber, setserialNumber] = useState('')
   const [type, setType] = useState('')
   const [image, setImage] = useState('')
   const [status, setStatus] = useState('')

   
   const handleSubmit = async(e) => {
    e.preventDefault();

    const device = {serialNumber, type, image, status}

    if(!serialNumber||!type||!image||!status){
      alert("Please Fill all the input fields")
      return;
    }

    await axios.post(`http://localhost:8000/location/${locationId}/device/addDevice`, device).then(()=>{
        
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
            <option value="">Select a Type</option>
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
            <option value="">Select the Status of the device</option>
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