import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../components/Login";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import { useSelector } from "react-redux";

const Router = () => {
  const auth = useSelector(store=>store)
  console.error(auth)
  return (
    <>
      <Routes>
        <Route path="/" element={!auth?.user ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/EditPDF" element={auth?.selectedPDF ? <Edit/> : <Navigate to={'/'}/>} />
      </Routes>
    </>
  );
};

export default Router;
