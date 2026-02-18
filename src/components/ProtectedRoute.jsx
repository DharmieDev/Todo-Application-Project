import { Navigate } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";

export default function ProtectedRoute({ children }) {
  const { meQuery } = useAuthMutation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace/>
  }
  
  if (meQuery.isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  
  if (meQuery.error || !meQuery.data) {
    localStorage.removeItem("token");
    return <Navigate to={"/login"} replace/>
  }
  
  return children;
}