import React, { useEffect, useState } from "react";
import {
  Button, Card, CardBody, FormGroup, Form,
  Input, InputGroupAddon, InputGroupText,
  InputGroup, Container, Row, Col, UncontrolledAlert
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE.js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export default function Registro(props) {
  const schema = yup.object().shape({
    usuario: yup.string().required("Favor ingresar usuario"),
    password: yup.string().required("Favor ingresar contraseña"),
  });;
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => console.log(data);

  return (
    <>
      <NavbarE />
      <main>
        {/* <UncontrolledAlert color="success" isOpen={visible} toggle={onDismiss} >
          <span className="alert-inner--text ml-1">
            {mensaje}
          </span>
        </UncontrolledAlert> */}
        <section className="section">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Registre sus credenciales</small>
                    </div>
                    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                      <FormGroup
                        className={errors.usuario?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.usuario?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Usuario"
                            type="text"
                            {...register("usuario")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={errors.usuario?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.password?.message}</label>
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
                            {...register("password")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit"
                        >
                          Crear cuenta
                          </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}