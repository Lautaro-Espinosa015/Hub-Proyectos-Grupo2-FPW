import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PeopleFill, PersonCircle } from 'react-bootstrap-icons';
import '../Css/HubStyles.css';
import { useAutorizacion } from '../components/Contexts/AutorizacionContext'; // 1. Importar el hook

function MainHeader() {
 const { isLoggedIn } = useAutorizacion(); // 2. Obtener el estado de login


  return (
    <Navbar className="main-header" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="main-header-brand">
          <PeopleFill className="group-icon" />
          Hub Proyectos Grupo 2
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="w-100">
            <Nav.Link as={Link} to="/" className="main-header-link">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/games" className="main-header-link">Proyectos</Nav.Link>
            <Nav.Link as={Link} to="/aboutus" className="main-header-link">Sobre Nosotros</Nav.Link>
            
            <Nav.Link as={Link} to="/Proyecto01_Espinosa" className="main-header-link">Proyecto1</Nav.Link>
            <Nav.Link as={Link} to="/Proyecto01_Cussi" className="main-header-link">Proyecto1</Nav.Link>

            <Nav.Link as={Link} to="/proyecto2" className="main-header-link">Proyecto2</Nav.Link>
            <Nav.Link as={Link} to="/pet-registry" className="main-header-link">Registro de Mascotas</Nav.Link>
            <Nav.Link as={Link} to="/proyecto4" className="main-header-link">Proyecto4</Nav.Link>
            {/* 3. Renderizado condicional del enlace */}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/juegomemoria" className="main-header-link">Juego de Memoria</Nav.Link>
            )}
            <Nav.Link href="#profile" className="main-header-link ms-auto">
              <PersonCircle /> Perfil
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainHeader;