import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Home from '../pages/Home';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet>
                <Home></Home>
            </Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;