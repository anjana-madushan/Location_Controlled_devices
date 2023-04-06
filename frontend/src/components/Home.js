import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [locations, setLocations] = useState([]);

    const navigate = useNavigate();

    

    /*
    
    const handleDelete = async(_id) => {

        await axios.delete(`http://localhost:8000/location/deleteLocation/${_id}`)
        .then((res)=>res.data)
        .then(()=>navigate("/"));
      }
*/
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
    <div>

      <h1><center>All Locations</center></h1>

<table className="table">
    <thead className="thead-dark">  
    <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th><center>Action</center></th>
    </tr>
    </thead>


           
<tbody>
{locations.map((location, key)=>(
             <tr key={key}>
             <td>{location.name}</td>
             <td>{location.address}</td>
             <td>{location.phone}</td>
             <td><center><button onClick={()=>navigate(`/${location.id}`)} className="btn btn-success p-1 me-2">View</button>

<button className="btn btn-danger p-1">Delete</button>
<button onClick={()=>navigate(`/${location.id}/device/addDevice`)}>Add Device</button>
</center>
</td>
             </tr>
 ))}

</tbody>
        
        </table>
    </div>
  )
}

export default Home