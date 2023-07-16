import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaLock } from 'react-icons/fa';
import LogoAi from '../components/Pictures/logoAImulti.png';
import '../App.css'
import Button from '../components/Buttonlogout';
import { CSSTransition } from 'react-transition-group';
import Switch from 'react-switch';
 function ColorSchemesExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);
   const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  }
   return (
    <>
      <Navbar bg={isDarkMode ? "dark" : "primary"} variant={isDarkMode ? "dark" : "light"} className="Navbar">
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
            <Nav.Link href="/ImgAI">IMG Filter</Nav.Link>
            <Nav.Link href="/FileViewer">FileViewer</Nav.Link>
            <Nav.Link href="/AIControl">AIControl <FaLock /></Nav.Link>
          </Nav>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            onColor="#000"
            offColor="#fff"
            className='switch-iphone'
            checkedIcon={false}
            uncheckedIcon={false}
            height={24}
            width={48}
          />
          <Button></Button>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
 export default ColorSchemesExample;