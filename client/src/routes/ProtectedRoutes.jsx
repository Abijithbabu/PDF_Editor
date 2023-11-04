import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
    return useSelector((state) => state?.user) ? <Outlet /> : <Navigate to='/login' replace />;
}

export default UserPrivateRoute