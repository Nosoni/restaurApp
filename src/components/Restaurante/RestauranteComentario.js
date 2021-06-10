import React, { useEffect, useState } from 'react'
import {
  Container, Row, Col, Table
} from "reactstrap";

export default function RestauranteComentario(props) {
  return (
    <Container>
      <Row>
        <h3 className="display-3 mb-0 font-italic">Comentarios</h3>
      </Row>
      {
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Mensaje</th>
              <th scope="col">Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {
              props.comentarios?.length > 0 ?
                props.comentarios.map(
                  comentario =>
                    <tr key={comentario.id}>
                      <td>{comentario.usuario.username}</td>
                      <td>{comentario.mensaje}</td>
                      <td>{comentario.puntuacion}</td>
                    </tr>) :
                <tr>
                  <td>Sin comentarios...</td>
                  <td></td>
                  <td></td>
                </tr>
            }
          </tbody>
        </Table>

      }
    </Container>
  )
}
