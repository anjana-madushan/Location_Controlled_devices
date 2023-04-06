import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddLocation from './components/addLocation'
import Header from './components/header'
import Home from './components/Home';
import SingleLocation from './components/singleLocation';
import AddDevice from './components/addDevice';

const App = () => {
  return (

    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/addLocation" element={<AddLocation />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/:id" element={<SingleLocation />}/>
      <Route path="/:locationId/device/addDevice" element={<AddDevice />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App