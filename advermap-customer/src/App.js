import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import React from "react";

import AutocompleteComponent from "./component/AutocompleteComponent";
import AdvertisementComponent from "./component/AdvertisementComponent";

function App() {
  const Layout = () => {
    return (
      <div className="h-screen w-screen">
        <Outlet />
      </div>
    );
  };

  //Setting Router
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/test",
          element: <AdvertisementComponent/>
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
