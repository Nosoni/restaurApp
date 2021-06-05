import React, { useEffect, useState } from 'react'
import {
  Container, Button, Card, Row, Col
} from "reactstrap";

export default function RestauranteComentario(props) {
  return (
    <Container>
      <Row>
        <h3 className="display-3 text-primary">
          Comentarios
        </h3>
      </Row>
      {
        props.comentarios &&
          props.comentarios.map(
            comentario =>
              <Row className="justify-content-between" key={comentario.id}>
                <Col xs="2">
                  {comentario.usuario.username}
                </Col>
                <Col xs="6">
                  {comentario.mensaje}
                </Col>
                <Col xs="2">
                  {comentario.puntuacion}
                </Col>
              </Row>
          )
      }
    </Container>
  )
}
