import React, { useEffect, useState } from "react";
import {
  Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input,
  Col
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE";
import RestaurantMiniInfo from "./../../components/Restaurant/RestaurantMiniInfo";
import { restauranteGetAll, restauranteGetByDescripcion } from "services/restaurante";

export default function Inicio(params) {
  const [state, setState] = useState("")
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    if (restaurantes.length === 0)
      buscarTodosRestaurantes()
  }, [restaurantes])

  const buscarTodosRestaurantes = async () => {
    var respuesta = await restauranteGetAll()
    setRestaurantes(respuesta)
  }

  const filtrarRestaurantes = async () => {
    var respuesta = await restauranteGetByDescripcion(state)
    setRestaurantes(respuesta)
  }

  const actualizarBusqueda = async (event) => {
    setState(event.target.value)
    if (event.key === "Enter") {
      filtrarRestaurantes()
    }
  };

  return (
    <>
      <NavbarE />
      <main >
        <section className="section-init">
          <Container>
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Buscar local gastronónimco" type="text" onKeyPress={event => actualizarBusqueda(event)} />
              </InputGroup>
            </FormGroup>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row >
              {
                restaurantes.map(rest => {
                  return <>
                    <Col xs="4">
                      <RestaurantMiniInfo restaurante={rest} />
                    </Col>
                    <Col xs="4">
                      <RestaurantMiniInfo restaurante={rest} />
                    </Col>
                    <Col xs="4">
                      <RestaurantMiniInfo restaurante={rest} />
                    </Col>
                    <Col xs="4">
                      <RestaurantMiniInfo restaurante={rest} />
                    </Col>
                    <Col xs="4">
                      <RestaurantMiniInfo restaurante={rest} />
                    </Col>
                  </>
                })
              }
            </Row>
          </Container>
        </section>
      </main>
    </>
  )
}