import React, { useContext, useEffect, useState } from 'react'
import { Accion, RestauranteEstado } from "./Restaurante"
import {
  Button, Card, Row, Col, Modal, CardHeader, CardBody, Input,
  FormGroup, InputGroup, InputGroupAddon, InputGroupText, Form
} from "reactstrap";
import { restauranteGetById } from 'services/restaurante';
import Loader from 'components/Loader';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
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
import { store } from '../../constantes/firebase'
import Select from 'react-select';
import { mesaGetByRestaurante } from 'services/mesa';
import { reservaGetByRestaurante } from 'services/reserva';
import moment from 'moment';
import { reservaAgregar } from 'services/reserva';

export default function RestauranteInfo() {
  const { state, dispatch } = useContext(RestauranteEstado);
  const [restaurante, setRestaurante] = useState({})
  const { promiseInProgress } = usePromiseTracker();
  const userLogueado = localStorage.getItem('token')?.length > 0;
  const usuario_id = localStorage.getItem('usuario_id');
  const [modalComentario, setModalComentario] = useState(false)
  const [modalReserva, setModalReserva] = useState(false)
  const [puntuacion, setPuntuacion] = useState('')
  const [comentario, setComentario] = useState('')
  const [diaReservacion, setDiaReservacion] = useState()
  const [logoUrl, setLogoUrl] = useState([]);
  const [selectOpciones, setSelectOpciones] = useState([])
  const [mesaConsultar, setMesaConsultar] = useState()
  const [reservas, setReservas] = useState([])
  const [horaInicio, setHoraInicio] = useState()
  const [horaFin, setHoraFin] = useState()

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#172b4d",
    }),
  }

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarListado = () => dispatch({ type: Accion.MOSTRAR_LISTADO });

  useEffect(() => {
    const loadImages = async (nombre) => {
      const urls = await trackPromise(buscarLogoRestaurante(nombre));
      setLogoUrl(urls);
    }

    if (state.seleccionado.id) {
      buscarInfoRestaurante(state.seleccionado.id)
      loadImages(state.seleccionado.nombre);
      buscarInfoMesas(state.seleccionado.id)
    }
  }, [state.seleccionado])

  const buscarLogoRestaurante = async (nombre) => {
    var storageRef = store.ref(nombre);
    let result = await storageRef.child("logo").listAll();
    let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

    return Promise.all(urlPromises);
  }

  const buscarInfoRestaurante = async (id) => {
    const respuesta = await trackPromise(restauranteGetById(id))
    setRestaurante(respuesta[0])
  }

  const handleOnClickCancel = () => {
    actualizarSelecion({})
    mostrarListado()
  }

  const handleOnClickAgregarComentario = () => {
    agregarComentario()
    setModalComentario(false)
    buscarInfoRestaurante(state.seleccionado.id)
  }

  const agregarComentario = async () => {
    await comentarioAgregar({
      usuario_id, restaurante_id: state.seleccionado.id,
      mensaje: comentario, puntuacion
    }, localStorage.getItem("token"))
  }

  const handleOnClickAgregarReserva = () => {
    try {
      if (!horaInicio) {
        return
      }
      if (!horaFin) {
        return
      }
      agregarReserva()
      setModalReserva(false)
      buscarInfoRestaurante(state.seleccionado.id)
    } catch (error) {
      alert(error.message)
    }
  }

  const agregarReserva = async () => {
    await reservaAgregar({
      restaurante_id: state.seleccionado.id,
      mesa_id: mesaConsultar,
      usuario_id,
      fecha_desde: horaInicio.format(),
      fecha_hasta: horaFin.format()
    }, localStorage.getItem("token"))
  }

  const buscarInfoMesas = async (restaurante_id) => {
    const mesas = await mesaGetByRestaurante(restaurante_id)
    let opciones = mesas.map(dato => { return { value: dato.id, label: "Nro. " + dato.numero + ". Cant personas " + dato.cant_personas } })
    setSelectOpciones(opciones)
  }

  const handleOnClickConsultar = async () => {
    if (!diaReservacion) {
      return
    }
    if (!mesaConsultar) {
      return
    }
    const respuestafilter = await reservaGetByRestaurante(state.seleccionado.id)
      .then(response => {
        return response.filter(reserva => {
          return reserva.mesa_id === mesaConsultar && moment(reserva.fecha_desde).format("DD/MM/YYYY") === diaReservacion.format("DD/MM/YYYY")
        })
      })

    const schedulerData = respuestafilter.map(reserva => (
      { startDate: moment(reserva.fecha_desde).format(), endDate: moment(reserva.fecha_hasta).format() }))
    setReservas(schedulerData)
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
                            src={logoUrl}
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
                              onClick={() => setModalComentario(true)}
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
                          <Col lg="12">
                            <Card className="card-reservacion">
                              <CardBody>
                                <Row>
                                  <Col xs="6">
                                    <FormGroup>
                                      <label className="h6 font-weight-300">
                                        Seleccione el día
                                    </label>
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
                                            dateFormat="DD/MM/YYYY"
                                            defaultValue={new Date()}
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <Button
                                        color="info"
                                        size="sm"
                                        onClick={() => handleOnClickConsultar()}
                                      >
                                        Consultar
                                      </Button>
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <label className="h6 font-weight-300">
                                        Seleccione la mesa
                                      </label>
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        options={selectOpciones}
                                        onChange={(seleccion) => setMesaConsultar(seleccion.value)}
                                        name="permiso"
                                        styles={customStyles}
                                      />
                                    </FormGroup>
                                    {
                                      userLogueado && <Button
                                        color="success"
                                        size="sm"
                                        onClick={() => setModalReserva(true)}
                                      >
                                        Reservar
                                    </Button>}
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                        <Row className="justify-content-center mb-3">
                          <Col lg="12">
                            <Card>
                              <Scheduler
                                data={reservas}
                                locale={"es-PY"}
                                height={350}
                              >
                                <ViewState
                                  currentDate={diaReservacion}
                                />
                                <DayView
                                  startDayHour={9}
                                  endDayHour={23}
                                />
                                <Appointments />
                              </Scheduler>
                            </Card>
                          </Col>
                        </Row>
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
              isOpen={modalComentario}
              toggle={() => setModalComentario(false)}
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
                          onClick={() => setModalComentario(false)}
                        >
                          Cancelar
                        </Button>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Modal>
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={modalReserva}
              toggle={() => setModalReserva(false)}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Hora inicio"
                          }}
                          defaultValue={diaReservacion}
                          dateFormat={false}
                          onChange={(value) => setHoraInicio(value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <ReactDatetime
                          inputProps={{
                            placeholder: "Hora Fin"
                          }}
                          defaultValue={diaReservacion}
                          dateFormat={false}
                          onChange={(value) => setHoraFin(value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Row className="justify-content-center">
                        <Button className="my-4"
                          color="primary"
                          type="button"
                          size="sm"
                          onClick={() => handleOnClickAgregarReserva()}
                        >
                          Agregar Reserva
                        </Button>
                        <Button
                          className="my-4"
                          color="warning"
                          size="sm"
                          onClick={() => setModalReserva(false)}
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