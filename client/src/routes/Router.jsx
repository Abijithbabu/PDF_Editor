import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../components/Login";
import Home from "../pages/Home";
import Editor from "../pages/Editor";
import { useSelector } from "react-redux";
import Files from "../pages/Files";
import Login from '../pages/Login' 
const Router = () => {
  const auth = useSelector(store=>store)
  console.error(auth)
  return (
    <>
      <Routes>
        <Route path="/" element={!auth?.user ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/files" element={<Files/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Login type='register'/>} />
      </Routes>
    </>
  );
};

export default Router;
