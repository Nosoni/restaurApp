import React, { useEffect, useState } from "react";
import {
  Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input,
  Col
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE";
import Restaurante from "../../components/Restaurante/Restaurante";
import { restauranteGetAll, restauranteGetByDescripcion } from "../../services/restaurante";
import ImageUploader from 'react-images-upload';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "../../components/Loader";

export default function Inicio(params) {
  const [restaurantes, setRestaurantes] = useState([])
  const [pictures, setPictures] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  // const onDrop = picture => {
  //   console.log("hola", picture)
  //   setPictures([...pictures, picture]);
  // };

  useEffect(() => {
    if (restaurantes.length === 0)
      buscarTodosRestaurantes()
  }, [restaurantes])

  const buscarTodosRestaurantes = async () => {
    var respuesta = await trackPromise(restauranteGetAll())
    console.log(respuesta)
    setRestaurantes(respuesta)
  }

  const actualizarBusqueda = async (event) => {
    if (event.key === "Enter") {
      setRestaurantes([])
      const respuesta = await trackPromise(restauranteGetByDescripcion(event.target.value))
      console.log(respuesta)
      setRestaurantes(respuesta)
    }
  };

  return (
    <>
      <NavbarE />
      <main >
        <section className="section-init">
          <Container>
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Buscar local gastronónimco" type="text" onKeyPress={event => actualizarBusqueda(event)} />
              </InputGroup>
            </FormGroup>
          </Container>
        </section>
        <section className="section">
          <Container>
            {
              promiseInProgress &&
              <div className="section-loader">
                <Loader mostrar={promiseInProgress} size={100} />
              </div>
            }
            <Restaurante listar={restaurantes}/>
            <Row>
              {/* <ImageUploader
                withIcon={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
              /> */}
            </Row>
          </Container>
        </section>
      </main>
    </>
  )
}