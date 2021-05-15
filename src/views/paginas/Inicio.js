import React, { useState } from "react";
import {
  Container, Row,
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE";
import Restaurante from "../../components/Restaurante/Restaurante";
import ImageUploader from 'react-images-upload';

export default function Inicio(params) {
  const [pictures, setPictures] = useState([]);

  // const onDrop = picture => {
  //   console.log("hola", picture)
  //   setPictures([...pictures, picture]);
  // };

  return (
    <>
      <NavbarE />
      <main >
        <Container>
          <Restaurante />
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
      </main>
    </>
  )
}