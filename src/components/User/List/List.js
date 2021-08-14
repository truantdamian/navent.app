import React, { useContext, useState } from "react";

import Modal from "Components/Modal/Modal";
import UserItem from "Components/User/Item/Item";
import Paginator from "Components/Paginator/Paginator";
import UserDetail from "Components/User/Detail/Detail";
import UserDelete from "Components/User/Delete/Delete";
import BtnAdd from "Components/BtnAdd/BtnAdd";

import { UserContext } from "Contexts/UserContextProvider";
import usePaginate from "Hooks/usePaginate";

import { addUser, editUser } from "Constants/actions";

import { container, list, noUser } from "./style.css";

const UserList = () => {
  const { state: users } = useContext(UserContext);

  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    avatar: "",
    birthDate: "",
    gender: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);

  const itemsPerPage = 5;

  const { paginatedList, totalPages } = usePaginate(
    users,
    currentPage,
    itemsPerPage
  );

  const [action, setAction] = useState(addUser);

  const handleShowUserNew = () => {
    const newId = new Date().getTime();
    setUserData({
      id: newId,
      name: "",
      avatar: `https://www.gravatar.com/avatar/${newId}?d=robohash`,
      birthDate: "",
      gender: "m",
      email: "",
    });
    setAction(addUser);
    setShowUserDetail(true);
  };

  const handleShowUserEdit = (id) => {
    const user = users.find((x) => x.id === id);
    setUserData({ ...userData, ...user });
    setAction(editUser);
    setShowUserDetail(true);
  };

  const handleShowUserDelete = (id) => {
    const user = users.find((x) => x.id === id);
    setUserData({ ...userData, ...user });
    setShowUserDelete(true);
  };

  return (
    <>
      <div className={container}>
        <BtnAdd handleClick={handleShowUserNew} />
        <div className={list}>
          {paginatedList.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              handleShowUserEdit={() => handleShowUserEdit(user.id)}
              handleShowUserDelete={() => handleShowUserDelete(user.id)}
            ></UserItem>
          ))}
        </div>
        {totalPages === 0 && (
          <div className={noUser}>
            <p>No hay usuarios! </p>
          </div>
        )}
        {totalPages !== 0 && (
          <Paginator
            pages={totalPages}
            visiblesPages={5}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {showUserDetail && (
        <Modal>
          <UserDetail
            userData={userData}
            setShowModal={setShowUserDetail}
            action={action}
          ></UserDetail>
        </Modal>
      )}

      {showUserDelete && (
        <Modal>
          <UserDelete userData={userData} setShowModal={setShowUserDelete} />
        </Modal>
      )}
    </>
  );
};

export default UserList;
