import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    <Navigate to="/" state={{ from: location }} repalce />;
  }

  return children;
};

export default RequireAuth;
