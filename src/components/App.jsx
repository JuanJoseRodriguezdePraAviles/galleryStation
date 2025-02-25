import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import Header from './Header';
import Footer from './Footer';

import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, Route, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/favourite',
        element: <Favourite />
      }
    ],
  }

]);

function App() {
  return (
    <>
      {<RouterProvider router={router} />}

    </>
  )
}
export default App;
