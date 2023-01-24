import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Timeline from "../Pages/Timeline";
import UserProfile from "../Pages/UserProfile";
import PrivateRoutes from "./PrivateRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route
        path="/user"
        element={
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/timeline"
        element={
          <PrivateRoutes>
            <Timeline />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
