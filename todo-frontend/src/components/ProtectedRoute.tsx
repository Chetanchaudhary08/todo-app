import { Navigate } from "react-router-dom";
// import type { JSX } from "react/jsx-runtime";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");

    // if no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
