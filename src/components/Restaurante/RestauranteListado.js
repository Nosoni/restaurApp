import React from 'react'
import {
  Row, Col
} from "reactstrap";
import RestaurantMiniInfo from './RestauranteMiniInfo';


export default function RestauranteListado(props) {
  return (
    <Row >
      {
        props.listar.map(rest => {
          return <Col xs="4" key={rest.id}>
            <RestaurantMiniInfo restaurante={rest} />
          </Col>
        })
      }
    </Row>
  )
}
