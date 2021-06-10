import React, { useContext, useEffect, useState } from 'react'
import { Accion, RestauranteEstado } from "./Restaurante"
import {
  Button, Card, Row, Col, Modal, CardHeader, CardBody, Input,
  FormGroup, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import { restauranteGetById } from 'services/restaurante';
import Loader from 'components/Loader';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import CardFooter from 'reactstrap/lib/CardFooter';
import RestauranteComentario from './RestauranteComentario';
import Rating from '@material-ui/lab/Rating';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import ReactDatetime from "react-datetime";
import { comentarioAgregar } from 'services/comentario';

export default function RestauranteInfo() {
  const { state, dispatch } = useContext(RestauranteEstado);
  const [restaurante, setRestaurante] = useState({})
  const { promiseInProgress } = usePromiseTracker();
  const userLogueado = localStorage.getItem('token')?.length > 0;
  const usuario_id = localStorage.getItem('usuario_id');
  const [modal, setModal] = useState(false)
  const [puntuacion, setPuntuacion] = useState('')
  const [comentario, setComentario] = useState('')
  const [diaReservacion, setDiaReservacion] = useState()

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

  //TODO
  const handleOnClickAgregarComentario = () => {
    agregarComentario()
    setModal(false)
    buscarInfoRestaurante(state.seleccionado.id)
  }

  const agregarComentario = async () => {
    await comentarioAgregar({
      usuario_id, restaurante_id: state.seleccionado.id,
      mensaje: comentario, puntuacion
    })
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
                    <Row className="justify-content-center mb-3">
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
                            className="float-right"
                            color="warning"
                            onClick={() => handleOnClickCancel()}
                            size="sm"
                          >
                            Volver
                          </Button>
                          {
                            userLogueado &&
                            <Button
                              className="float-right"
                              color="default"
                              // onClick={e => e.preventDefault()}
                              onClick={() => setModal(true)}
                              size="sm"
                            >
                              Comentar
                            </Button>
                          }
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
                    <Row className="justify-content-center mb-3">
                      <Col xs="4">
                        <div className="text-left">
                          <h3 className="font-italic">
                            {restaurante.nombre}
                          </h3>
                          <div className="h6 font-weight-300">
                            {restaurante.descripcion}
                          </div>
                          <div className="h6 mt-2">
                            Horario de atención desde {restaurante.hora_apertura} hasta {restaurante.hora_cierre}
                          </div>
                        </div>
                      </Col>
                      <Col xs="8"
                      >
                        <h3 className="font-italic">
                          Hacer una reservación
                        </h3>
                        <Row>
                          <Col xs="3">
                            <small className="h6 font-weight-300">
                              Seleccione el día
                            </small>
                          </Col>
                          <Col xs='5'>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime
                                  onChange={(value) => setDiaReservacion(value)}
                                  timeFormat={false}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col xs='4'>
                            <Button
                              color="info"
                              size="sm"
                            >
                              Consultar
                            </Button>
                          </Col>
                        </Row>
                        <div>
                          <Scheduler
                            data={schedulerData}
                            locale={"es-PY"}
                            height={350}
                          >
                            <ViewState
                              currentDate={"2018-11-01"}
                            />
                            <DayView
                              startDayHour={19}
                              endDayHour={23}
                            />
                            <Appointments />
                          </Scheduler>
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
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={modal}
              toggle={() => setModal(false)}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div className="text-muted text-center">
                      <small>Introduzca su comentario</small>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Input
                      placeholder="Comentario"
                      type="text"
                      onChange={(e) => setComentario(e.target.value)}
                    />
                    <label className="mt-3 mr-3">Puntuación</label>
                    <Rating
                      name="simple-controlled"
                      onChange={(value) => { setPuntuacion(value.target.value) }}
                    />
                    <div className="text-center">
                      <Row className="justify-content-center">
                        <Button className="my-4"
                          color="primary"
                          type="button"
                          size="sm"
                          onClick={() => handleOnClickAgregarComentario()}
                        >
                          Agregar comentario
                        </Button>
                        <Button
                          className="my-4"
                          color="warning"
                          size="sm"
                          onClick={() => setModal(false)}
                        >
                          Cancelar
                        </Button>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </section>
      }
    </>
  )
}
const schedulerData = [
  { startDate: '2018-11-01T19:45', endDate: '2018-11-01T20:00', title: 'Meeting' },
  { startDate: '2018-11-01T20:00', endDate: '2018-11-01T22:00', title: 'Go to a gym' },
];