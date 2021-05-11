import React, { useEffect, useState } from 'react'
import { Row, Col, Card, UncontrolledCarousel } from "reactstrap";
import Rating from '@material-ui/lab/Rating';
import { comentariosGetByRestaurante } from 'services/restaurateComentario';

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
  const restaurante = props.restaurante
  const [calificacion, setCalificacion] = useState(0)

  useEffect(() => {
    if (calificacion === 0) {
      obtenerCalificacion()
    }
  }, [calificacion])

  const obtenerCalificacion = async () => {
    let restCalif = await comentariosGetByRestaurante(restaurante.id)
    setCalificacion(restCalif)
  }

  return (
    <>
      <Col>
        <Card className="card-lift--hover shadow border-0">
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
                  value={calificacion}
                />
              </Row>
              <p style={{ fontSize: "smaller" }}> {restaurante.descripcion.substring(0, 85) + "..."}</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}