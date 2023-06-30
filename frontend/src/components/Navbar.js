import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogoAi from '../components/Pictures/logoAImulti.png';
import '../App.css'
import Button from '../components/Buttonlogout';
function ColorSchemesExample() {
 
  return (
    <>
  
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand><img src={LogoAi} width={50} className={'cg-logo loading nav'} />AIGPT</Navbar.Brand>
          <Nav className="me-auto">
          
          
            <Nav.Link href="/Home">AIGPT Chat</Nav.Link>
            <Nav.Link href="/ImgAI">ImgAI</Nav.Link>
            <Nav.Link href="/Profilo">Mio Profilo</Nav.Link>
            <Button></Button>
          </Nav>
        </Container>
      </Navbar>

      <br />
    </>
  );
}

export default ColorSchemesExample;