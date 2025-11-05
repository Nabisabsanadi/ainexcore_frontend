import React from "react";

import { Outlet } from "react-router-dom";
import Copyright from "./components/Copyright";
import Header from "./components/Header";
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Copyright />
        </>
    );
};

export default Layout;
