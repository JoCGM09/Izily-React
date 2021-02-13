import React from "react";
import NavBar from "../components/Navbar"


const Layout = ({ children }) => (
    <div className="App">
        <NavBar/>
        <div className="contenedor" style={{marginTop:"70px"}}>
            {children}  
        </div>
    </div>
)

export default Layout;