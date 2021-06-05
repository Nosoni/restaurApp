import React, { useContext, useEffect, useState } from 'react'
import { Accion, RestauranteEstado } from "./Restaurante"
import {
  Container, Button, Card, Row, Col
} from "reactstrap";
import { restauranteGetById } from 'services/restaurante';
import Loader from 'components/Loader';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import CardFooter from 'reactstrap/lib/CardFooter';
import RestauranteComentario from './RestauranteComentario';

export default function RestauranteInfo() {
  const { state, dispatch } = useContext(RestauranteEstado);
  const [restaurante, setRestaurante] = useState({})
  const { promiseInProgress } = usePromiseTracker();

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarListado = () => dispatch({ type: Accion.MOSTRAR_LISTADO });

  useEffect(() => {
    if (state.seleccionado.id) {
      buscarInfoRestaurante(state.seleccionado.id)
    }
  }, [state.seleccionado])

  const buscarInfoRestaurante = async (id) => {
    const respuesta = await trackPromise(restauranteGetById(id))
    setRestaurante(respuesta[0])
  }

  const handleOnClickCancel = () => {
    actualizarSelecion({})
    mostrarListado()
  }

  return (
    <>
      <section className="section-init" />
      {
        promiseInProgress ?
          <div className="section-loader">
            <Loader mostrar={true} size={100} />
          </div> :
          <section className="profile-page">
            {
              <>
                <Card className="card-profile shadow mt--300">
                  <div className="px-4">
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </div>
                      </Col>
                      <Col
                        className="order-lg-3 text-lg-right align-self-lg-center"
                        lg="4"
                      >
                        <div className="card-profile-actions py-4 mt-lg-0">
                          <Button
                            color="warning"
                            onClick={() => handleOnClickCancel()}
                            size="sm"
                          >
                            Volver
                          </Button>
                          <Button
                            className="float-right"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                          >
                            Comentar
                          </Button>
                        </div>
                      </Col>
                      <Col className="order-lg-1" lg="4">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">{restaurante.mesa?.length}</span>
                            <span className="description">Mesas</span>
                          </div>
                          <div>
                            <span className="heading">{restaurante.comentario?.length}</span>
                            <span className="description">Comentarios</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="4">
                        <div className="text-left mt-5 ">
                          <h3 className="font-italic">
                            {restaurante.nombre}
                          </h3>
                          <div className="h6 font-weight-300">
                            {restaurante.descripcion}
                          </div>
                          <div className="h6 mt-4">
                            Horario de atención desde {restaurante.hora_apertura} hasta {restaurante.hora_cierre}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
                <CardFooter>
                  <RestauranteComentario comentarios={restaurante.comentario} />
                </CardFooter>
              </>
            }
          </section>
      }
    </>
  )
}
