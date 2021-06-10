import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button, NavbarBrand, Navbar, NavItem, Nav, Container
} from "reactstrap";

export default function NavbarE() {
  const [userLogueado, setUserLogueado] = useState(false)

  useEffect(() => { setUserLogueado(localStorage.getItem('token')?.length > 0) }, [userLogueado])

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
                {
                  !userLogueado &&
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
                }
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                {
                  userLogueado ?
                    <Button className="btn-warning btn-icon"
                      to="/inicio"
                      size="sm"
                      onClick={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('usuario_id')
                        localStorage.removeItem('usuario')
                        setUserLogueado(false)
                      }}
                    >
                      <span className="nav-link-inner--text ml-1">
                        Logout
                      </span>
                      <i className="fa fa-sign-out" />
                    </Button> :
                    <Button className="btn-neutral btn-icon"
                      color="default"
                      to="/login"
                      size="sm"
                      tag={Link}>
                      <span className="nav-link-inner--text ml-1">
                        Login
                      </span>
                      <i className="fa fa-sign-in" />
                    </Button>
                }
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
