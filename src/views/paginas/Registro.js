import React from "react";
import {
  Button, Card, CardBody, FormGroup, Form,
  Input, InputGroupAddon, InputGroupText,
  InputGroup, Container, Row, Col, UncontrolledAlert
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE.js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "components/Loader";

export default function Registro(props) {
  const schema = yup.object().shape({
    nombre: yup.string().required("Favor ingresar Nombre"),
    apellido: yup.string().required("Favor ingresar Apellido"),
    contacto: yup.string().required("Favor ingresar Contacto"),
    email: yup.string().required("Favor ingresar Email"),
    usuario: yup.string().required("Favor ingresar Usuario"),
    password: yup.string().required("Favor ingresar Contraseña"),
  });;
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  })
  const { promiseInProgress } = usePromiseTracker();

  const onSubmit = async data => {
    //const respuesta = await trackPromise(login1({ usuario: data.usuario, contrasenha: data.password })) 
    console.log(data);
  }

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
                  <Loader mostrar={promiseInProgress} size={50} />
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Registre sus credenciales</small>
                    </div>
                    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                      <FormGroup
                        className={errors.nombre?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.nombre?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Nombre"
                            type="text"
                            {...register("nombre")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={errors.apellido?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.apellido?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Apellido"
                            type="text"
                            {...register("apellido")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={errors.contacto?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.contacto?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-phone" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Contacto"
                            type="text"
                            {...register("contacto")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={errors.email?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.email?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-envelope-o" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            {...register("email")}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={errors.usuario?.message.length > 0 ? 'has-danger' : 'mb-3'}
                      >
                        <label className="label-invalid">{errors.usuario?.message}</label>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-user-secret" />
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
                          disabled={promiseInProgress}
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