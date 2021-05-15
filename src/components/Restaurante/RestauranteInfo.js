import React, { useContext, useState } from 'react'
import { Accion, RestauranteEstado } from "./Restaurante"
import {
  Container
} from "reactstrap";

export default function RestauranteInfo() {
  const { state, dispatch } = useContext(RestauranteEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarListado = () => dispatch({ type: Accion.MOSTRAR_LISTADO });

  return (<>
    <section className="section-init">
      <Container>
        hola {valoresIniciales.nombre}
      </Container></section> </>
  )
}
