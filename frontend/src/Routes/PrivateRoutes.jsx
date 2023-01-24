import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const toast = useToast();
  const isAuth = useSelector((store) => store.isAuth);
  if (!isAuth) {
    toast({
      title: "Please SignIn",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoutes;
