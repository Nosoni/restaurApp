import React from "react";
import {
  Button, Card, CardBody, FormGroup, Form,
  Input, InputGroupAddon, InputGroupText,
  InputGroup, Container, Row, Col
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE.js";
import CardFooter from "reactstrap/lib/CardFooter";

export default function Login(props) {
  const handleClickResgitrar = () => {
    props.history.push("registro")
  }

  return (
    <>
      <NavbarE />
      <main>
        <section className="section">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Introduzca sus credenciales</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Usuario" type="text" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                        >
                          Ingresar
                          </Button>
                      </div>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      size="sm"
                      color="link"
                      onClick={() => handleClickResgitrar()}
                    >
                      Crear cuenta
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}