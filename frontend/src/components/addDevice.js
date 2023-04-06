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
      <input 
       type="text" onChange = {(e)=>setType(e.target.value)} value={type} name='type' className="form-control" id="type" placeholder="Enter type"/>
    </div>

    <div className="form-group">
      <label htmlFor="image">Image</label>
      <input 
      type="text" onChange = {(e)=>setImage(e.target.value)} value={image} name='image' className="form-control" id="image" placeholder="Enter Image"/>
    </div>

    <div className="form-group">
      <label htmlFor="image">Status</label>
      <input 
      type="text" onChange = {(e)=>setStatus(e.target.value)} value={status} name='status' className="form-control" id="status" placeholder="Enter Status"/>
    </div>
<br/>

     <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}

export default AddDevice