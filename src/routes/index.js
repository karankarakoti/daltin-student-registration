import { useRoutes } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import NotFoundRoutes from "./NotFoundRoutes";

export default function AppRoutes() {
  return useRoutes([MainRoutes, NotFoundRoutes]);
}