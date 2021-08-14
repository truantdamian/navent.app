import React from "react";
import PropTypes from "prop-types";

import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";

import { container, main } from "./style.css";

const Layout = ({ children }) => {
  return (
    <div className={container}>
      <Header />
      <main className={main}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
