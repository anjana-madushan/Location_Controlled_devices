import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [locations, setLocations] = useState([]);

    const navigate = useNavigate();

    /*
    const handleDelete = async() => {

        await axios.delete(`http://localhost:8000/location/deleteLocation/${_id}`)
        .then((res)=>res.data)
        .then(()=>navigate("/add"))
        .then(()=>navigate("/books"));
      }
*/
    useEffect(()=>{

        
        const getLocations = async() => {
            try {
                const response = await axios.get("http://localhost:8000/location/");
                const locations = response.data.locations.map(locations => ({
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

<table>
    <thead>
    <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
    </tr>
    </thead>


           
<tbody>
{locations.map((location, key)=>(
             <tr key={key}>
             <td>{location.name}</td>
             <td>{location.address}</td>
             <td>{location.phone}</td>
             <td><center><button onClick = {()=>navigate(`/${location._id}`)} className="btn btn-success p-1 me-2">View</button>

<button  className="btn btn-danger p-1">Delete</button>
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