import React from "react";
import NavBar from "../components/Navbar";

const Layout = ({ children }) => (
  <div className="App" style={{ fontFamily: "Roboto" }}>
    <NavBar />
    <div className="contenedor" style={{ paddingTop: "50px" }}>
      {children}
    </div>
  </div>
);
export default Layout;
