import { useRoutes, Navigate } from "react-router-dom";
import { Home, Login } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Routes = {
  path: string;
  element: React.ReactNode;
};

const routes: Routes[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

const userRouts = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export const ConfigRoutes: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return useRoutes([...(user ? routes : userRouts)]);
};
