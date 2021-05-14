import { server } from "constantes/constantes";
const servicio = "usuario";
const axios = require("axios")

export const login = async (datos) => {
  return { id: 1, nombre: "Antonio", token: "9y8QcLjyWzhtz68jJJvQ6EhFUkg8JbahkTsR45fFQyrB2TZiVP" }
  const url = `${server}/${servicio}`;
  const respuesta = await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: datos
  })
  return respuesta
};

export const login1 = async (datos) => {
  const url = `https://flow.cba.com.py/demo_webservices/rest.asmx/EntidadesDispositivosLogin`;
  const respuesta = await axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: { "usuario": "frecalde", "contrasenha": "a", "caracteristica": "prueba", "hash": "015d4724-e9f1-46ea-8c05-a059ce7882ae" }
  })
  return respuesta
};

