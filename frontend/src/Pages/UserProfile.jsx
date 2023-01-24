import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteUser, getUser } from "../Redux/action";
import bcrypt from "bcryptjs";
import { API } from "../api/api";

const UserProfile = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [updatedProfile, setUpdatedProfile] = useState({
    full_name: currentUser.full_name,
    new_email: currentUser.email,
    new_password: "",
    new_avatar_url: currentUser.avatar_url,
  });
  const handleDelete = async (user) => {
    try {
      let response = await axios.delete(`${API}/user/${user.id}`);
      dispatch(deleteUser());
      toast({
        title: "Profile delete successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/signup");
    } catch (error) {
      console.log({ error });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({
      ...updatedProfile,
      [name]: value,
    });
  };
  const handleEditProfile = async (id) => {
    try {
      if (
        updatedProfile.full_name !== "" &&
        updatedProfile.new_email !== "" &&
        updatedProfile.new_avatar_url !== ""
      ) {
        if (updatedProfile.new_password === "") {
          let response = await axios.patch(`${API}/user/${id}`, {
            avatar_url: updatedProfile.new_avatar_url,
            full_name: updatedProfile.full_name,
            email: updatedProfile.new_email,
          });
          toast({
            title: "Profile edited!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          response.data.password = "";
          dispatch(getUser(response.data));
        } else {
          let hash = bcrypt.hashSync(updatedProfile.new_password, 10);
          let response = await axios.patch(`${API}/user/${id}`, {
            avatar_url: updatedProfile.new_avatar_url,
            full_name: updatedProfile.full_name,
            email: updatedProfile.new_email,
            password: hash,
          });
          toast({
            title: "Profile edited!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          response.data.password = "";
          dispatch(getUser(response.data));
        }
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "please see console for more informations",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Flex justify={"center"} m="5rem auto 0 auto">
      <Card maxW="xs">
        <CardBody>
          <Image
            width={"100%"}
            src={currentUser.avatar_url}
            alt={currentUser.user_name}
            borderRadius="50%"
          />
          <Stack mt="6" spacing="3" textAlign={"center"}>
            <Heading fontFamily={"Nunito, sans-serif"} size="md">
              @{currentUser.user_name}
            </Heading>
            <Text as={"h1"}>{currentUser.full_name}</Text>
            <Text as={"h2"} fontWeight={"bold"}>
              {currentUser.email}
            </Text>
            <Flex gap={"10px"}>
              <Button>{Math.floor(Math.random() * 100)} Followers</Button>
              <Button>{Math.floor(Math.random() * 100)} Following</Button>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button onClick={onOpen} variant="solid" colorScheme="green">
              Edit Profile
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit your profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={updatedProfile.full_name}
                      name="full_name"
                      type={"text"}
                      placeholder="Enter new full name"
                      defaultValue={currentUser.full_name}
                    />
                    <FormLabel mt={"10px"}>Email</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={updatedProfile.new_email}
                      name="new_email"
                      type={"email"}
                      placeholder="Enter new email"
                      defaultValue={currentUser.email}
                    />
                    <FormLabel mt={"10px"}>Password</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={updatedProfile.new_password}
                      name="new_password"
                      type={"password"}
                      placeholder="Enter new password"
                    />
                    <FormLabel mt={"10px"}>Profile Image</FormLabel>
                    <Input
                      onChange={handleChange}
                      value={updatedProfile.new_avatar_url}
                      name="new_avatar_url"
                      type={"url"}
                      placeholder="Enter new image url"
                      defaultValue={currentUser.avatar_url}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => handleEditProfile(currentUser.id)}
                    colorScheme="teal"
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => handleDelete(currentUser)}
            >
              Delete Account
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UserProfile;
