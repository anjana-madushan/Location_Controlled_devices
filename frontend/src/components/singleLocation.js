import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import "./styles/styles.css"
import swal from 'sweetalert';

const SingleLocation = () => {

  const [location, setLocation] = useState({});
  const { id } = useParams();

  useEffect(()=>{
      const getLocation = async() => {
          try {
              const response = await axios.get(`http://localhost:8000/location/${id}`);
              setLocation(response.data.location)
            } catch (err) {
              console.log(err)
            }
          }
      getLocation()
  }, [id])

  console.log(location.name)
 
  const handleDelete = (device_id)=>{

    swal({title: "Are you sure?",
        text: "You want to delete this Location?",
        icon: "warning",
        dangerMode: true
      }).then((willDelete)=>{
        if(willDelete){
        swal("location is deleted", {
          icon: "success",
          buttons: false,
          timer:2000,

        })
      
    
axios.delete(`http://localhost:8000/location/${id}/device/${device_id}`)

setLocation(prevState=>{
  const filteredDevices = prevState.devices.filter(device=> device.id !== device._id);
  window.location.reload()//reloading page 
  return {...prevState, devices:filteredDevices}

  
}).catch((err)=>{
      console.log(err)
    })
  }else{
    swal({
    text:"Your item is saved!",
    buttons: false,
    timer:2000
  });
}
})
}
return (
  <>

  <div className='location_details'>
    <h1>Location Name       :{location.name}</h1>
    <h1>Location Address  :{location.address}</h1>
    <h1>Location Phone No :{location.phone}</h1>
  </div>
    

    <h2 className='location_devices'><center>DEVICES</center></h2>

    {location.devices && location.devices.length>0 ? ( location.devices.map((device)=>(
      <div className="device-details">

      <div className="image-container">
        <img src={device.image} alt={device.image} />
      </div>

      <div className="details-container">
        <h3>Device Serial No: {device.serialNumber}</h3>
        <h3>Device Type: {device.type}</h3>
        <h3>Device Status: {device.status}</h3>
        <div className='btn_delete'><button onClick={() => handleDelete(device._id)}>Delete Device</button></div>
        
      </div>
    </div>
        
    ))):(<h2><center>No devices are Found in here!</center></h2>)}
      </>
)
}
export default SingleLocation


