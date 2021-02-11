import React from "react";
import NavBar from "../components/Navbar"


const Layout = ({ children}) => (
    <div className="App">
        <NavBar/>
        {children}
    </div>
)

export default Layout;