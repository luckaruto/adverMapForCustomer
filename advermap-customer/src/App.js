import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import React from "react";

import AutocompleteComponent from "./component/AutocompleteComponent";
import AdvertisementComponent from "./component/AdvertisementComponent";
import DetailOfAdvertisement from "./component/DetailOfAdvertisement";
import DetailsPage from "./Pages/DetailsPage";
import FormReport from "./component/FormReport";

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
          path: "/details/:surfaceid",
          element: <DetailsPage />,
        },
        {
          path: "test",
          element: <FormReport />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
