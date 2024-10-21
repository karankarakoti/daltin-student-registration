import { lazy } from "react";

import { Loadable } from "components";
import { MainLayout } from "layout";

const Home = Loadable(lazy(() => import("pages/home")));
const Register = Loadable(lazy(() => import("pages/register")));
const RegisterDetail = Loadable(lazy(() => import("pages/register/detail")));

const MainRoutes = {
  path: "/",
  element: <MainLayout></MainLayout>,
  children: [
    {
      path: "",
      element: <Home/>
    },
    {
      path: "register",
      children: [
        {
          path: "",
          element: <Register/>
        },
        {
          path: ":id",
          element: <RegisterDetail/>
        }
      ]      
    }
  ]
};

export default MainRoutes;