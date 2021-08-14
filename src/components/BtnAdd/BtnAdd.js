import React from "react";
import { container } from "./style.css";
const BtnAdd = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className={container}>
      +
    </div>
  );
};

export default BtnAdd;
