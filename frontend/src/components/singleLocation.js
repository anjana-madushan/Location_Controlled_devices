import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const SingleLocation = () => {

    const [location, setLocation] = useState({});
    const { id } = useParams();

    useEffect(()=>{
        const getLocation = async() => {
            try {
                const response = await axios.get(`http://localhost:8000/location/${id.id}`);
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
        {location && 
            <div>
                <h2>{location.name}</h2>
                <p>{location.address}</p>
                <p>{location.phone}</p>
            </div>
        }
    </div>
  )
}

export default SingleLocation