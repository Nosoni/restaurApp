import { server } from "../constantes/constantes";
const servicio = "comentario";
const axios = require("axios")

export const comentarioAgregar = async (comentario) => {
  const url = `${server}/${servicio}`;
  await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(comentario)
  })
    .catch(e => console.error("error", e))
};