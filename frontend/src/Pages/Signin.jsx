import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/action";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { API } from "../api/api";
const Signin = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.user_name == "" &&
      formData.email === "" &&
      formData.password === ""
    ) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      newUserLogin(formData);
    }
  };

  const newUserLogin = async (user_data) => {
    try {
      let response = await axios.get(`${API}/user`);
      let data = response.data;
      let findUser = data.filter(
        (elem) =>
          elem.user_name === user_data.user_name &&
          elem.email === user_data.email
      );
      if (findUser.length !== 0) {
        bcrypt.compare(user_data.password, findUser[0].password, (err, res) => {
          if (res) {
            user_data.password = "";
            user_data.avatar_url = findUser[0].avatar_url;
            user_data.full_name = findUser[0].full_name;
            user_data.id = findUser[0].id;
            dispatch(userLogin(user_data));
            toast({
              title: "SignIn success",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
            navigate("/user");
          } else {
            toast({
              title: "Wrong user credentials",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
          }
        });
      } else {
        toast({
          title: "Wrong user credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "see console for more details",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log({ error });
    }
  };
  return (
    <Box mt={"7rem"}>
      <Heading
        fontFamily={"Nunito, sans-serif"}
        textAlign={"center"}
        m={"1rem auto"}
      >
        Sign In
      </Heading>
      <FormControl w={{ base: "80%", md: "50%", lg: "30%" }} m={"auto"}>
        <VStack>
          <Input
            onChange={handleChange}
            name="user_name"
            value={formData.user_name}
            type="text"
            placeholder="Enter Username"
            required
          />
          <Input
            onChange={handleChange}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Enter email"
            required
          />
          <Input
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Enter password"
            required
          />
        </VStack>
        <Flex mt={"10px"} justify={"flex-end"}>
          <Button onClick={handleSubmit} colorScheme={"teal"} type="submit">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Signin;
