import { server } from "constantes/constantes";
const servicio = "restaurantes_comentarios";
const axios = require("axios")

export const restaurantesComentariosGetAll = async () => {
  const url = `${server}/${servicio}/`;
  return await axios.get(url)
    .then(response => response.json())
};

export const restaurantesComentariosGetByRestaurante = async (id) => {
  const where = `?and=(activo.is.true,restaurante_id.eq.${id})`
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
