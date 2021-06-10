import { serverLogin } from "constantes/constantes";
const axios = require("axios")

export const login = async (data) => {
  const url = `${serverLogin}`;
  const respuesta = await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
  return { token: respuesta.data.token, user: respuesta.data.user }
};