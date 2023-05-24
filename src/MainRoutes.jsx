import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem("apiKey");

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}
