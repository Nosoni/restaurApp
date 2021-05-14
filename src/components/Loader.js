import React from 'react'
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  position: absolute;
`;
export default function Loader(props) {
  return (
    <PuffLoader color={"#334441"} loading={props.mostrar} css={override} size={props.size} />
  )
}
