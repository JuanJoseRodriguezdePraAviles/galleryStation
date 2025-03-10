import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import Header from './Header';
import Footer from './Footer';

import React from 'react';
import { RouterProvider, createHashRouter, Route, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'favourite',
        element: <Favourite />
      }
    ],
  }
]);

function App() {
  if(!localStorage.getItem('images')){
    localStorage.setItem('images', '[]');
  }

  return (
    <>
      {<RouterProvider router={router} />}
    </>
  )
}
export default App;
