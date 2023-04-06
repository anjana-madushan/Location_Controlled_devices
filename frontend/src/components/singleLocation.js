import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const SingleLocation = () => {

  const [location, setLocation] = useState({});
  const { id } = useParams();

  useEffect(()=>{
      const getLocation = async() => {
          try {
              const response = await axios.get(`http://localhost:8000/location/${id}`);
              setLocation(response.data)
              console.log(response.data)
            } catch (err) {
              console.log(err)
            }
          }
      getLocation()
  }, [id])

return (
          <div>

            
              <h2>{location.name}</h2>
              <p>{location.address}</p>
              <p>{location.phone}</p>

              <ul>{location.devices && location.devices.map((device)=>(
                <li key ={device._id}>
                  <p>Serial No : {device.serialNumber}</p>
                  <p>Type : {device.type}</p>
                  <img src={device.image} alt={device.image} />
                  <p>Status:{device.status}</p>
                </li>
              ))}</ul>
          </div>
      
 
)
}

export default SingleLocation


