import React, { useContext } from "react";
import { UserContext } from "Contexts/UserContextProvider";
import { buttons, button, btnCancel, btnSave } from "Styles/base.css";
import { container } from "./style.css";

import { deleteUser } from "Constants/actions";

const UserDelete = ({ userData, setShowModal }) => {
  const { dispatch } = useContext(UserContext);
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch({ type: deleteUser, payload: userData });
    setShowModal(false);
  };

  return (
    <div className={container}>
      <p>¿Esta seguro que desea eliminar el usuario?</p>
      <div className={buttons}>
        <button className={`${button} ${btnCancel}`} onClick={handleCancel}>
          Cancelar
        </button>
        <button className={`${button} ${btnSave}`} onClick={handleDelete}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default UserDelete;
