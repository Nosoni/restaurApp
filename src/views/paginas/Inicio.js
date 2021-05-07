import React, { useEffect, useState } from "react";
import {
  Container, Row, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input
} from "reactstrap";
import NavbarE from "components/Navbars/NavbarE";
import RestaurantMiniInfo from "components/Restaurant/RestaurantMiniInfo";
import { restaurantesGetAll, restaurantesGetByDescripcion } from "services/restaurante";

export default function Inicio(params) {
  const [state, setState] = useState("")
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    if (restaurantes.length === 0)
      buscarTodosRestaurantes()
  }, [restaurantes])

  const buscarTodosRestaurantes = async () => {
    var respuesta = await restaurantesGetAll()
    console.log(respuesta)
    setRestaurantes(respuesta)
  }

  const filtrarRestaurantes = async () => {
    var respuesta = await restaurantesGetByDescripcion(state)
    console.log(respuesta)
    setRestaurantes(respuesta)
  }

  const actualizarBusqueda = async (event) => {
    setState(event.target.value)
    if (event.key === "Enter") {
      filtrarRestaurantes()
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
            <Row xs="2">
              {
                restaurantes.map(rest => {
                  return <RestaurantMiniInfo restaurante={rest} />
                })
              }
            </Row>
          </Container>
        </section>
      </main>
    </>
  )
}

// class Inicio extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       filtroBusqueda: "",
//     };
//   }
//   componentDidMount() {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//     this.refs.main.scrollTop = 0;
//   }

//   render() {
//     return (
//       <>
//         <NavbarE />
//         <main ref="main">
//           <section className="section-init">
//             <Container>
//               <FormGroup className="mb-0">
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="fa fa-search" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input placeholder="Buscar local gastronónimco" type="text" onKeyPress={event => this.actualizarBusqueda(event.target.value)} />
//                 </InputGroup>
//               </FormGroup>
//             </Container>
//           </section>
//           <section className="section">
//             <Container>
//               <Row xs="2">
//                 <RestaurantMiniInfo>
//                 </RestaurantMiniInfo>

//                 <RestaurantMiniInfo>
//                 </RestaurantMiniInfo>
//               </Row>
//             </Container>
//           </section>
//         </main>
//       </>
//     );
//   }
// }