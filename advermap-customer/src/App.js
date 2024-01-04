import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import React from "react";

import DetailsPage from "./Pages/DetailsPage";
import FormReport from "./component/FormReport";
import ReportComponent from "./component/ReportComponent";

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
          path: "/details/:surfaceId",
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
