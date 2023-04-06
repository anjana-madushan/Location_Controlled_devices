import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [locations, setLocations] = useState([]);

    const navigate = useNavigate();

    

    
    
    const handleDelete = async(id) => {

        

          await axios.delete(`http://localhost:8000/location/deleteLocation/${id}`)
          .then((res)=>{
            const filteredLocations = locations.filter(location => location.id !== id)

            setLocations(filteredLocations)
          }
          
        ).catch((err)=>{
          console.log(err)
        })
      }

    useEffect(()=>{

        
        const getLocations = async() => {
            try {
                const response = await axios.get("http://localhost:8000/location/");
                const locations = response.data.locations.map(locations => ({
                  id:locations._id, 
                  name: locations.name,
                  address: locations.address,
                  phone: locations.phone
                }));
                setLocations(locations)
                console.log(locations)
              } catch (err) {
                console.log(err)
              }
            }
        getLocations()
    }, [])

  return (
    <div className='allLocations'>

      <h1><center>LOCATIONS</center></h1>

<table className="table">
    <thead className="thead-dark">  
    <tr>
            <th><center>Name</center></th>
            <th><center>Address</center></th>
            <th><center>Phone</center></th>
            <th><center>Action</center></th>
    </tr>
    </thead>


           
<tbody>
{locations.map((location, key)=>(
             <tr key={key}>
             <td><center>{location.name}</center></td>
             <td><center>{location.address}</center></td>
             <td><center>{location.phone}</center></td>
             <td><center>
              <button onClick={()=>navigate(`/${location.id}`)} className="btn btn-info p-1 me-2">View</button>
              <button onClick={()=>handleDelete(location.id)}className="btn btn-danger p-1 me-2">Delete</button>
              <button onClick={()=>navigate(`/${location.id}/device/addDevice`)} className="btn btn-primary p-1 me-2">Add Device</button>
            </center></td>
</tr>
 ))}

</tbody>
        
        </table>
    </div>
  )
}

export default Home