import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const StyledNavbar = styled(BootstrapNavbar)`
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StyledBrand = styled(BootstrapNavbar.Brand)`
  font-family: 'Playfair Display', serif !important;
  font-size: 1.8rem !important;
  font-weight: 700 !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none !important;
  position: relative;
  

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: #2c3e50 !important;
  font-weight: 500 !important;
  margin: 0 0.5rem !important;
  padding: 0.5rem 1rem !important;
  border-radius: 25px !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: all 0.3s ease;
    z-index: -1;
    border-radius: 25px;
  }

  &:hover {
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 0;
    }
  }

  &.active {
    color: white !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const Navbar = () => (
  <StyledNavbar expand="lg" fixed="top">
    <Container>
      <LinkContainer to="/">
        <StyledBrand>Hotels</StyledBrand>
      </LinkContainer>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/">
            <StyledNavLink>Ver Hoteles</StyledNavLink>
          </LinkContainer>
          <LinkContainer to="/create">
            <StyledNavLink>Crear Hotel</StyledNavLink>
          </LinkContainer>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </StyledNavbar>
);

export default Navbar;