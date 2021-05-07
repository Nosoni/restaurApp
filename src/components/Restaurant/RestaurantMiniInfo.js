import React, { useEffect, useState } from 'react'
import { Row, Col, Card, UncontrolledCarousel } from "reactstrap";
import Rating from '@material-ui/lab/Rating';
import { restaurantesComentariosGetByRestaurante } from 'services/restaurateComentario';

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

export default function RestaurantMiniInfo(restaurant) {
  const [calificacion, setCalificacion] = useState(0)

  useEffect (()=>{
    if (calificacion === 0) {
      obtenerCalificacion()
    }
  }, [calificacion])

  const obtenerCalificacion = async () => {
    let restCalif = await restaurantesComentariosGetByRestaurante(restaurant.id)
    console.log(restCalif)
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
                  {restaurant.nombre}
                </small>
              </Row>
              <Row>
                <Rating
                  name="simple-controlled"
                  value={calificacion}
                />
              </Row>
              <Row>
                <Col lg="11">
                  <p> {restaurant.descipcion.slice(0, 127) + "..."}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}