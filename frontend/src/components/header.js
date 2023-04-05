import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>LOCATION-CONTROLLER</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>HOME</Nav.Link>
            <Nav.Link as={Link} to='/addLocation'>ADD LOCATION</Nav.Link>
            <Nav.Link as={Link} to='/psfg'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default Header