import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authToken = localStorage.getItem("token");
  return authToken ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;