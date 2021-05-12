import React from "react";
import { Link } from "react-router-dom";
import {
  Button, NavbarBrand, Navbar, NavItem, Nav, Container
} from "reactstrap";


export default function NavbarE() {
  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/inicio" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/dish2.svg")}
              />
            </NavbarBrand>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button className="btn-neutral btn-icon"
                  color="default"
                  to="/registro"
                  size="sm"
                  tag={Link}>
                  <span className="nav-link-inner--text ml-1">
                    Registrar
                  </span>
                  <i className="fa fa-address-card-o" />
                </Button>
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button className="btn-neutral btn-icon"
                  color="default"
                  to="/login"
                  size="sm"
                  tag={Link}>
                  <span className="nav-link-inner--text ml-1">
                    Login
                  </span>
                  <i className="fa fa-user-o" />
                </Button>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
