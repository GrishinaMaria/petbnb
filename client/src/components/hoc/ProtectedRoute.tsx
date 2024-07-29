import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({
    children,
    isAllowed,
    redirectPath = "/signin",
}) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return children || <Outlet />;
}


 