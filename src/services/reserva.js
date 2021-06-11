import { server } from "../constantes/constantes";
const servicio = "reservas";
const axios = require("axios")

export const reservaGetByRestaurante = async (restaurante_id) => {
  const url = `${server}/restaurante/${servicio}/${restaurante_id}`;
  const response = await axios.get(url)
  return response.data.data
};

export const reservaAgregar = async (reserva, token) => {
  const url = `${server}/reserva`;
  await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    data: JSON.stringify(reserva)
  })
    .catch(e => console.error("error", e))
};