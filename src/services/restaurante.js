import { server } from "constantes/constantes";
const servicio = "restaurantes";
const axios = require("axios")

export const restaurantesGetAll = async () => {
  const url = `${server}/${servicio}/`;
  return await axios.get(url)
    .then(response => response.json())
};

export const restaurantesGetByDescripcion = async (descripcion) => {
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
