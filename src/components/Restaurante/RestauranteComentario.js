import React, { useEffect, useState } from 'react'

export default function RestauranteComentario(props) {
  const [prueba, setPrueba] = useState([])
  useEffect(() => {
    console.log(props.comentarios)
    const asdf = props.comentarios?.map(coment => {
      return { fullName: coment.usuario.username, text: coment.mensaje, createdAt: new Date() }
    })
    setPrueba(asdf)
  }, [props])
  return (
    <div className="comentario">
    </div>
  )
}
