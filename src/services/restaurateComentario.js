import { server } from "constantes/constantes";
const servicio = "comentario";
const axios = require("axios")

export const comentariosGetAll = async () => {
  const url = `${server}/${servicio}/`;
  return await axios.get(url)
    .then(response => response.json())
};

export const comentariosGetByRestaurante = async (id) => {
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
