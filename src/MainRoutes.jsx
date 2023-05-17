import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";

/* const ProtectedRoutes = ({ redirectTo }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    isAuthenticated ? (
      
    ) : <Navigate to={redirectTo} />
  )
} */

export function MainRoutes() {
 return (
  <Routes>
   <Route path="/" element={<Navigate to="/login" />} />
   <Route path="/login" element={<Login />} />
   <Route path="/home" element={<Home />} />
  </Routes>
 );
}
