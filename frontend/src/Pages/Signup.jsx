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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignup } from "../Redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { API } from "../api/api";

const Signup = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    avatar_url: "",
    full_name: "",
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
      formData.avatar_url === "" &&
      formData.full_name === "" &&
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
      newUserSignUp(formData);
    }
  };

  const newUserSignUp = async (user_data) => {
    try {
      let response = await axios.get(`${API}/user`);
      let data = response.data;
      let email = data.findIndex((elem) => elem.email === user_data.email);
      let user_name = data.findIndex(
        (elem) => elem.user_name === user_data.user_name
      );
      if (email !== -1) {
        toast({
          title: "User already exists",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else if (user_name !== -1) {
        toast({
          title: "User with this user name already exists",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        try {
          user_data.password = bcrypt.hashSync(user_data.password, 10);
          let res = await axios.post(`${API}/user`, user_data);
          toast({
            title: "SignUp successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          res.data.password = "";
          dispatch(userSignup(res.data));
          navigate("/");
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
        Sign Up
      </Heading>
      <FormControl w={{ base: "80%", md: "50%", lg: "30%" }} m={"auto"}>
        <VStack>
          <Input
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            type="text"
            placeholder="Enter Username"
          />
          <Input
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            type="text"
            placeholder="Enter Avatar URL"
          />
          <Input
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            type="text"
            placeholder="Enter full name"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
          />
        </VStack>
        <Flex mt={"10px"} justify={"flex-end"}>
          <Button colorScheme={"teal"} type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Signup;
