import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../components/Login";
import Home from "../pages/Home";
import Editor from "../pages/Editor";
import { useSelector } from "react-redux";
import Files from "../pages/Files";

const Router = () => {
  const auth = useSelector(store=>store)
  console.error(auth)
  return (
    <>
      <Routes>
        <Route path="/" element={!auth?.user ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/files" element={<Files/>} />
      </Routes>
    </>
  );
};

export default Router;
