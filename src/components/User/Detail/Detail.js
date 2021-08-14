import React, { useContext, useState } from "react";
import { UserContext } from "Contexts/UserContextProvider";
import validator from "validator";

import {
  container,
  formInput,
  formInputHorizontal,
  errorInput,
  radioInput,
  buttons,
} from "./style.css";

import { button, btnCancel, btnSave } from "Styles/base.css";

import { addUser, editUser } from "Constants/actions";

const UserDetail = ({ userData, setShowModal, action }) => {
  const { dispatch } = useContext(UserContext);
  const { id, avatar, name, birthDate, gender, email } = userData;
  const [user, setUser] = useState({
    id,
    avatar,
    name,
    birthDate,
    gender,
    email,
  });

  const [error, setError] = useState({
    name: "",
    birthDate: "",
    gender: "",
    email: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    action === addUser ? add(user) : edit(user);

    setShowModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const add = (user) => {
    dispatch({ type: addUser, payload: user });
  };

  const edit = (user) => {
    dispatch({ type: editUser, payload: user });
  };

  const validateForm = () => {
    let isOk = true;
    let errorName = "";
    let errorBirthDate = "";
    let errorEmail = "";
    if (validator.isEmpty(user.name)) {
      errorName = "Ingrese un nombre";
      isOk = false;
    }

    if (!validator.isDate(user.birthDate, { format: "YYYY-MM-DD" })) {
      errorBirthDate = "Ingrese una Fecha válida";
      isOk = false;
    }

    if (validator.isEmpty(user.email)) {
      errorEmail = "Ingrese un Email";
      isOk = false;
    } else if (!validator.isEmail(user.email)) {
      errorEmail = "Ingrese un Email válido";
      isOk = false;
    }

    setError({ name: errorName, birthDate: errorBirthDate, email: errorEmail });

    return isOk;
  };

  return (
    <form className={container} noValidate={true}>
      <div className={formInput}>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        {error.name !== "" && <span className={errorInput}>{error.name}</span>}
      </div>
      <div className={formInput}>
        <label>Fecha creación</label>
        <input
          type="date"
          name="birthDate"
          value={user.birthDate}
          onChange={handleChange}
        ></input>
        {error.birthDate !== "" && (
          <span className={errorInput}>{error.birthDate}</span>
        )}
      </div>
      <div className={formInputHorizontal}>
        <label className={radioInput}>
          <input
            type="radio"
            id="genderM"
            value="m"
            name="gender"
            checked={user.gender === "m"}
            onChange={handleChange}
          />
          Masculino
        </label>
        <label className={radioInput}>
          <input
            type="radio"
            id="genderF"
            value="f"
            name="gender"
            checked={user.gender === "f"}
            onChange={handleChange}
          />
          Femenino
        </label>
      </div>
      <div className={formInput}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        ></input>
        {error.email !== "" && (
          <span className={errorInput}>{error.email}</span>
        )}
      </div>
      <div className={buttons}>
        <button className={`${button} ${btnCancel}`} onClick={handleCancel}>
          Cancelar
        </button>
        <button className={`${button} ${btnSave}`} onClick={handleSave}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default UserDetail;
