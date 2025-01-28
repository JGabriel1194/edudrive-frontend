import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthConext";

const AuthRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoute;
