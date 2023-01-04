import React from "react";
import { useRoutes } from "react-router-dom";

const MainLayout = React.lazy(() => import('../layouts'));
const Login = React.lazy(() => import('../modules/login'));
const SocialPages = React.lazy(() => import('../modules/SocialPages'));

function AllRoutes(): JSX.Element {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/:userId/pages/", element: <SocialPages /> },
      { path: "/:userId/pages/:pageId", element: <SocialPages /> },
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
}

export default AllRoutes;
