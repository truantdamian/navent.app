import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import { addUser, deleteUser, editUser } from "Constants/actions";

export const UserContext = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case addUser:
      return [...state, action.payload];
    case editUser:
      const index = state.findIndex((x) => x.id === action.payload.id);
      state[index] = { ...state[index], ...action.payload };
      return state;
    case deleteUser:
      return [...state.filter((x) => x.id !== action.payload.id)];
    default:
      return state;
  }
};

const initialState = [
  {
    id: 1628769369553,
    name: "robot 1",
    birthDate: "1985-01-11",
    gender: "m",
    email: "robot1@gmail.com",
    avatar: "https://www.gravatar.com/avatar/1628769369553?d=robohash",
  },
  {
    id: 1628769388284,
    name: "robot 2",
    birthDate: "1985-01-11",
    gender: "m",
    email: "robot2@gmail.com",
    avatar: "https://www.gravatar.com/avatar/1628769388284?d=robohash",
  },
];

const getInitialState = () => {
  const users = localStorage.getItem("userStorage");
  return users === null ? initialState : JSON.parse(users);
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    if (!state) return;
    localStorage.setItem("userStorage", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.element,
};

export default UserContextProvider;
