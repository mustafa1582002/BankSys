import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import'./Header.css'
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <div>
       <Navbar bg="dark" variant="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="#home" className='logo'>Bank-System</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home" className='btn'>Home</Nav.Link>
            <Nav.Link href="#home" className='btn'>Contact Us</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
     
    </div>
  )
}

export default Header
 