import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GoogleDrive from "../components/GoogleDrive";
import Home from "../pages/Home";
import Editor from "../pages/Editor";
import Files from "../pages/Files";
import Login from '../pages/Login'
import ProtectedRoutes from './ProtectedRoutes'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />} >
          <Route path="/editor" element={<Editor />} />
          <Route path="/files" element={<Files />} />
          <Route path="/drive" element={<GoogleDrive />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login type='register' />} />
        <Route path="/*" element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

export default Router;
