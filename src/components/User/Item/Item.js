import React from "react";

import { dateToShow } from "Helpers/dateHelper";
import Male from "Icons/Male";
import Female from "Icons/Female";

import {
  container,
  iconGender,
  femaleColor,
  maleColor,
  textData,
  avatarImg,
  buttons,
  btnLink,
  btnGray,
} from "./style.css";

const UserItem = ({ user, handleShowUserEdit, handleShowUserDelete }) => {
  const { id, name, birthDate, email, gender, avatar } = user;
  return (
    <div className={container}>
      <span className={iconGender}>
        {gender === "m" ? (
          <Male heigth={24} width={24} />
        ) : (
          <Female heigth={24} width={24} />
        )}
      </span>
      <div className={avatarImg}>
        <img alt="avatar" src={avatar} />
      </div>
      <div className={textData}>
        <h2 className={gender === "m" ? maleColor : femaleColor}>{name}</h2>
        <p>
          <span>{dateToShow(birthDate, "-")}</span>
        </p>
        <p>{email}</p>
        <div className={buttons}>
          <button
            className={`${btnLink} ${btnGray}`}
            onClick={handleShowUserDelete}
          >
            ELIMINAR
          </button>
          <button className={btnLink} onClick={handleShowUserEdit}>
            MODIFICAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
