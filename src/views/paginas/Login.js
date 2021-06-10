import React, { useEffect, useState } from "react";
import {
  Button, Card, CardBody, FormGroup, Form,
  Input, InputGroupAddon, InputGroupText,
  InputGroup, Container, Row, Col
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE.js";
import CardFooter from "reactstrap/lib/CardFooter";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from "../../services/login";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "../../components/Loader";

function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({});
  const schema = yup.object().shape({
    username: yup.string().required("Favor ingresar usuario"),
    password: yup.string().required("Favor ingresar contraseña"),
  });;
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema)
  })
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (localStorage.getItem('token')?.length > 0) {
      props.history.push("/inicio")
    }
  }, [])

  useEffect(() => {
    if (!isObjEmpty(userLogin)) {
      localStorage.setItem('token', userLogin.token);
      localStorage.setItem('usuario_id', userLogin.user.id);
      localStorage.setItem('usuario', userLogin.user.username);
      props.history.push("/inicio")
    }
  }, [userLogin])

  const handleClickResgitrar = () => {
    props.history.push("registro")
  }

  const onSubmit = async data => {
    await trackPromise(login(data))
      .then(respuesta => {
        setUserLogin(respuesta)
      })
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
                  <Loader mostrar={promiseInProgress} size={50} />
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Introduzca sus credenciales</small>
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
                            {...register("username")}
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