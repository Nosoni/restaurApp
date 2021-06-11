import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Card, UncontrolledCarousel } from "reactstrap";
import Rating from '@material-ui/lab/Rating';
import { Accion, RestauranteEstado } from "./Restaurante"
import { store } from '../../constantes/firebase'

export default function RestaurantMiniInfo(props) {
  const { dispatch } = useContext(RestauranteEstado);
  const restaurante = props.restaurante
  const [imagenUrl, setImagenUrl] = useState([]);
  const [items, setItems] = useState([]);

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarInfo = () => dispatch({ type: Accion.MOSTRAR_INFO });

  useEffect(() => {
    const loadImages = async (nombre) => {
      const urls = await buscarImagenRestaurante(nombre);
      setImagenUrl(urls);
    }

    loadImages(restaurante.nombre);
  }, [restaurante])

  useEffect(() => {
    const imagenes = imagenUrl.map(url => ({
      src: url,
      altText: "",
      caption: "",
      header: ""
    }))
    setItems(imagenes)
  }, [imagenUrl])

  const buscarImagenRestaurante = async (nombre) => {
    var storageRef = store.ref(nombre);
    let result = await storageRef.child("imagen").listAll();
    let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

    return Promise.all(urlPromises);
  }

  const buscarInfoRestaurante = () => {
    actualizarSelecion(restaurante)
    mostrarInfo()
  }

  return (
    <>
      <Card className="card-lift--hover shadow border-0" onClick={() => buscarInfoRestaurante()}>
        <Row>
          <Col className="mb-lg-auto" lg="6">
            <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
              <UncontrolledCarousel items={items} />
            </div>
          </Col>
          <Col className="mb-lg-auto" lg="6">
            <Row>
              <small className="text-uppercase text-muted font-weight-bold font-italic">
                {restaurante.nombre}
              </small>
            </Row>
            <Row>
              <Rating
                name="simple-controlled"
                value={restaurante.promedioPuntacion}
                readOnly
              />
            </Row>
            <p style={{ fontSize: "smaller" }}> {restaurante.descripcion.substring(0, 85) + "..."}</p>
          </Col>
        </Row>
      </Card>
    </>
  )
}