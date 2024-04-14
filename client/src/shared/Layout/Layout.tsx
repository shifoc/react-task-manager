import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar';

const Layout = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
        </>
    );
};

export default Layout;