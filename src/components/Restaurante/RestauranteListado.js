import React, { useEffect, useState } from 'react'
import {
  Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Container
} from "reactstrap";
import { restauranteGetAll, restauranteGetByDescripcion } from "../../services/restaurante";
import RestaurantMiniInfo from './RestauranteMiniInfo';
import Loader from "../../components/Loader";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";

export default function RestauranteListado() {
  const [restaurantes, setRestaurantes] = useState([])
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (restaurantes.length === 0)
      buscarTodosRestaurantes()
  }, [restaurantes])

  const buscarTodosRestaurantes = async () => {
    var respuesta = await trackPromise(restauranteGetAll())
    setRestaurantes(respuesta)
  }

  const actualizarBusqueda = async (event) => {
    if (event.key === "Enter") {
      setRestaurantes([])
      const respuesta = await trackPromise(restauranteGetByDescripcion(event.target.value))
      setRestaurantes(respuesta)
    }
  };

  return (
    <>
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
        {
          promiseInProgress &&
          <div className="section-loader">
            <Loader mostrar={promiseInProgress} size={100} />
          </div>
        }
        <Row>
          {
            restaurantes.map(rest => {
              return <Col xs="4" key={rest.id}>
                <RestaurantMiniInfo key={rest.nombre} restaurante={rest} />
              </Col>
            })
          }
        </Row>
      </section>
    </>
  )
}
