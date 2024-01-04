import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import React from "react";

import DetailsPage from "./Pages/DetailsPage";

import DetailsReportPage from "./Pages/DetialsReportPage";

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
          path: "/detailsReport/:reportId",
          element: <DetailsReportPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
