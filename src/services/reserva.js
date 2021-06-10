import { server } from "../constantes/constantes";
const servicio = "reservas";
const axios = require("axios")

export const reservaGetByRestaurante = async (restaurante_id) => {
  const url = `${server}/restaurante/${servicio}/${restaurante_id}`;
  const response = await axios.get(url)
  return response.data.data
};
