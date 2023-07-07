
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import LogoAi from '../components/Pictures/logoAImulti.png';
import '../App.css'
import Button from '../components/Buttonlogout';
import { CSSTransition } from 'react-transition-group';

 function ColorSchemesExample() {
   return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <CSSTransition
              in={true}
              appear={true}
              timeout={3000}
              classNames="navLogo"
            >
              <img src={LogoAi} width={50} className={'cg-logo loading nav'} />
            </CSSTransition>
            AIGPT
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Home">AIGPT Chat</Nav.Link>
            <Nav.Link href="/ImgAI">ImgAI</Nav.Link>
            <Nav.Link href="/Profilo">Mio Profilo</Nav.Link>
            <Nav.Link href="/TempoLibero">Mio Profilo</Nav.Link>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Utente
            </Dropdown.Toggle>
             <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Azione 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Azione 2</Dropdown.Item>
              <Dropdown.Item href= "/TempoLibero">Tempo Libero</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button></Button>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
 export default ColorSchemesExample;