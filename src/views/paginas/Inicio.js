import React, { useEffect, useState } from "react";
import {
  Container, Row, Button, Col
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE";
import Restaurante from "../../components/Restaurante/Restaurante";
import ImageUploader from 'react-images-upload';
import { store } from '../../constantes/firebase'

export default function Inicio(params) {
  const [pictures, setPictures] = useState([]);
  const [files, setFiles] = useState([]);

  const onDrop = picture => {
    setPictures(picture);
  };

  const hazlo = () => {
    pictures.map(file => {
      var storageRef = store.ref('img/' + file.name);
      var task = storageRef.put(file)
    })
  }

  useEffect(() => {
    const fetchImages = async () => {
      var storageRef = store.ref("img");

      let result = await storageRef.listAll();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

      return Promise.all(urlPromises);
    }

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    }
    loadImages();
  }, []);

  return (
    <>
      <NavbarE />
      <main >
        <Container>
          <Restaurante />
          <Row>
            {/* <Button onClick={() => hazlo()}> hazlo </Button>
            <ImageUploader
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
            /> */}
          </Row>
          <Row>
            {files.map((file, index) => <Col xs="4"><img key={index} src={file} /></Col>)}
          </Row>
        </Container>
      </main>
    </>
  )
}