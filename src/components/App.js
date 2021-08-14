import React from "react";

import UserContextProvider from "Contexts/UserContextProvider";

import UserList from "Components/User/List/List";
import Layout from "Components/Layout/Layout";

const App = () => {
  return (
    <Layout>
      <UserContextProvider>
        <UserList />
      </UserContextProvider>
    </Layout>
  );
};

export default App;
