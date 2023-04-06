import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import {useNavigate} from "react-router-dom"
import './styles/styles.css'

import swal from 'sweetalert';

const AddLocation = () => {
    const navigate = useNavigate();
   const [name, setName] = useState('')
   const [address, setAddress] = useState('')
   const [phone, setPhone] = useState('')

   

   const handleSubmit = (e) => {
    e.preventDefault();

    if(!name||!address||!phone){
      swal({
        title:"Please Fill all the input fields",
        icon:"warning"
      })
      return;
    }

    if(phone.length !== 10){
      swal({
        title:"phone no should have 10 numbers",
        icon:"warning"
      })
      
      return;
    }
    const location = {name, address, phone}

    axios.post('http://localhost:8000/location/addLocation', location).then(()=>{
      swal({
        title: "Location Added!",
        
        icon: "success"
        
       
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
      <label htmlFor="name">Name</label>
      <input 
       type="text" onChange = {(e)=>setName(e.target.value)} value={name} name='name' className="form-control" id="name"  placeholder="Enter Name"/>
    </div>
    
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input 
       type="text" onChange = {(e)=>setAddress(e.target.value)} value={address} name='address' className="form-control" id="address" aria-describedby="addressHelp" placeholder="Enter address"/>
    </div>

    <div className="form-group">
      <label htmlFor="phone">Phone</label>
      <input 
      type="text" onChange = {(e)=>setPhone(e.target.value)} value={phone} name='phone' className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Enter phone"/>
    </div>
<br/>

     <button type="submit" className="btn btn-primary"><center>ADD LOCATION</center></button>
  </form>
  </div>
  )
}

export default AddLocation