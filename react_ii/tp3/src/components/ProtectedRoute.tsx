import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: boolean;
};

function ProtectedRoute({ isAuth }: ProtectedRouteProps) {
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
