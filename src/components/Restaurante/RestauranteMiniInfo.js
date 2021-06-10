import React, { useContext } from 'react'
import { Row, Col, Card, UncontrolledCarousel } from "reactstrap";
import Rating from '@material-ui/lab/Rating';
import { Accion, RestauranteEstado } from "./Restaurante"

const items = [
  {
    src: require("assets/img/theme/img-1-1200x1000.jpg"),
    altText: "",
    caption: "",
    header: ""
  },
  {
    src: require("assets/img/theme/img-2-1200x1000.jpg"),
    altText: "",
    caption: "",
    header: ""
  }
];

export default function RestaurantMiniInfo(props) {
  const { dispatch } = useContext(RestauranteEstado);
  const restaurante = props.restaurante

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarInfo = () => dispatch({ type: Accion.MOSTRAR_INFO });

  const buscarInfoRestaurante = () => {
    actualizarSelecion(restaurante)
    mostrarInfo()
  }

  return (
    <>
      <Card className="card-lift--hover shadow border-0" onClick={() => buscarInfoRestaurante()}>
        <Row>
          <Col className="mb-lg-auto" lg="6">
            <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
              <UncontrolledCarousel items={items} />
            </div>
          </Col>
          <Col className="mb-lg-auto" lg="6">
            <Row>
              <small className="text-uppercase text-muted font-weight-bold font-italic">
                {restaurante.nombre}
              </small>
            </Row>
            <Row>
              <Rating
                name="simple-controlled"
                value={restaurante.promedioPuntacion}
                readOnly
              />
            </Row>
            <p style={{ fontSize: "smaller" }}> {restaurante.descripcion.substring(0, 85) + "..."}</p>
          </Col>
        </Row>
      </Card>
    </>
  )
}