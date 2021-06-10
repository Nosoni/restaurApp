import { server } from "../constantes/constantes";
const servicio = "mesas";
const axios = require("axios")

export const mesaGetByRestaurante = async (restaurante_id) => {
  const url = `${server}/restaurante/${servicio}/${restaurante_id}`;
  const response = await axios.get(url)
  return response.data.data
};