import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isLogged: boolean;
};

export default function ProtectedRoute({ isLogged }: ProtectedRouteProps) {
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
