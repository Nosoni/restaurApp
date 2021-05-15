import React, { useReducer } from "react";
import RestauranteInfo from "./RestauranteInfo";
import RestauranteListado from "./RestauranteListado";
import { createContext } from "react";

export const RestauranteEstado = createContext(null);

export default function Restaurante(props) {
  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarListado: true,
    mostrarInfo: false,
  });

  return (
    <React.Fragment>
      <RestauranteEstado.Provider value={{ state, dispatch }}>
        {state.mostarListado && <RestauranteListado />}
        {state.mostrarInfo && <RestauranteInfo />}
      </RestauranteEstado.Provider>
    </React.Fragment >
  )
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Accion.SELECCIONADO:
      return { ...state, seleccionado: action.payload }
    case Accion.MOSTRAR_INFO:
      return { ...state, mostarListado: false, mostrarInfo: true }
    case Accion.MOSTRAR_BUSCADOR:
      return { ...state, mostarListado: true, mostrarInfo: false }
    default:
      return state
  }
}

export const Accion = {
  SELECCIONADO: "seleccionado",
  MOSTRAR_LISTADO : "mostarListado",
  MOSTRAR_INFO: "mostrarInfo",
};