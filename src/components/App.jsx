import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import Header from './Header';
import Footer from './Footer';

import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, Route, Outlet } from 'react-router-dom';
import { fetchPhotos } from '../redux/slices/SearchSlice';

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
  if(!localStorage.getItem('images')){
    let images = new Array();
    
    localStorage.setItem('images', '[]');
  }

  

  return (
    <>
      {<RouterProvider router={router} />}

    </>
  )
}
export default App;
