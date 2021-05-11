import { server } from "constantes/constantes";
const servicio = "restaurante";
const axios = require("axios")

export const restauranteGetAll = async () => {
  const url = `${server}/${servicio}/`;
  const response = await axios.get(url)
  return response.data.data
};

export const restauranteGetByDescripcion = async (descripcion) => {
  const where = `?and=(activo.is.true,descripcion.like.*${descripcion})*`
  const url = `${server}/${servicio}${where}`;
  const respuesta = await axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return respuesta.data
};
