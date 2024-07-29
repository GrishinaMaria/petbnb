import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './widgets/Navbar/Navbar';
import Footer from './widgets/Footer';

export default function Root() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '70px' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
