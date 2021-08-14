import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import { sectionModal, container, main, content, close } from "./style.css";

const modalSelector = document.querySelector("#modal");

const Modal = ({ children, setShowModal, showClose = false }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return reactDom.createPortal(
    <div className={sectionModal}>
      <div className={container}>
        <div className={main}>
          {showClose && (
            <div className={close}>
              <button onClick={handleClose}>cerrar</button>
            </div>
          )}
          <div className={content}>{children}</div>
        </div>
      </div>
    </div>,
    modalSelector
  );
};

export default Modal;
