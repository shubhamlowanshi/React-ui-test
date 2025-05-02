import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import "./Homepage.css";
import logo from '../assets/logos.png';
import { HiOutlineLogout } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";

const Navbars = ({ isAuthenticated, setIsAuthenticated, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const getTotalCartItems = () => {
    if (Array.isArray(cartItems)) {
      return cartItems.reduce((acc, item) => acc + (item.qty || 1), 0); // Safe fallback to 1 if qty is undefined
    }
    return 0;
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} height={50} width={80} alt="Logo" />
        </Navbar.Brand>

        {/* Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Left side links */}
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/mens" style={{ color: 'white' }}>Men's Wear</Nav.Link>
                <Nav.Link as={Link} to="/womens" style={{ color: 'white' }}>Women's Wear</Nav.Link>
                <Nav.Link as={Link} to="/kids" style={{ color: 'white' }}>Kid's Wear</Nav.Link>
                <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}><FaShoppingCart />  </Nav.Link>
              </>
            )}
          </Nav>

          {/* Right side auth buttons */}
          <Nav className="ml-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: 'white' }}>Register</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link disabled style={{ color: 'white' }}>
                <FaRegUser />{username ? `Hello, ${username}` : 'Hello'}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ color: 'white', cursor: 'pointer' }}>
                <HiOutlineLogout />
                </Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
