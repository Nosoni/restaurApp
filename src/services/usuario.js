import { server } from "../constantes/constantes";
const servicio = "usuario";
const axios = require("axios")

export const usuarioCrear = async (usuario) => {
  const url = `${server}/${servicio}`;
  await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(usuario)
  })
    .catch(e => console.error("error", e))
};