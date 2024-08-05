import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({
    children,
    isAllowed,
    redirectPath = "/signin",
    //redirectPath = "/"
}) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return children || <Outlet />;
}


 