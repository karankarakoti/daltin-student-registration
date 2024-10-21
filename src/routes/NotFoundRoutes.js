import { lazy } from "react";

import { Loadable } from "components";

const NotFound = Loadable(lazy(() => import("pages/not-found")));

const NotFoundRoutes = {
  path: "*",
  element: <>    
    <NotFound />    
  </>,  
};

export default NotFoundRoutes;