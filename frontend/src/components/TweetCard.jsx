import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../api/api";
import { getPosts } from "../Redux/action";
import SearchGif from "./SearchGif";

const TweetCard = ({ gif, user_name, des, id, location, timeStamp }) => {
  const currentUser = useSelector((store) => store.currentUser);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newtweet, setNewTweet] = useState("");
  const [selectedgif, setSelectedGif] = useState("");
  const [searchgif, setSearchGif] = useState("");
  const [mapGifData, setMapGifData] = useState([]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/posts/${id}`);
      toast({
        title: "Tweet Deleted!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      dispatch(getPosts());
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  const handletweetChange = (e) => {
    if (e.target.value !== "") {
      setNewTweet(e.target.value);
    }
  };
  const handleEdit = async (id) => {
    try {
      if (selectedgif !== "" && newtweet !== "") {
        await axios.patch(`${API}/posts/${id}`, {
          gif_url: selectedgif,
          des: newtweet,
        });
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      } else if (selectedgif !== "") {
        await axios.patch(`${API}/posts/${id}`, {
          gif_url: selectedgif,
        });
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      } else {
        await axios.patch(`${API}/posts/${id}`, {
          des: newtweet,
        });
        toast({
          title: "Tweet edited!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        dispatch(getPosts());
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Card width={"100%"}>
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={user_name} src={currentUser.avatar_url} />
            <Box>
              <Heading fontFamily={"Nunito, sans-serif"} size="sm">
                {currentUser.full_name}
              </Heading>
              <Text>@{user_name}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize={{ base: "sm", md: "md", lg: "md", xl: "lg" }}>
          {des}
        </Text>
      </CardBody>
      <Image src={gif} alt={user_name} />
      <Flex justify={"flex-end"} mt={"10px"} p={"0 5px"}>
        <Text textAlign={"right"} fontSize={{ base: "xs", md: "xs", lg: "sm" }}>
          {location},
        </Text>
        <Text textAlign={"right"} fontSize={{ base: "xs", md: "xs", lg: "sm" }}>
          {timeStamp}
        </Text>
      </Flex>
      <CardFooter justify="space-between" flexWrap="wrap">
        {user_name === currentUser.user_name ? (
          <>
            <Button
              onClick={onOpen}
              size={{ base: "sm", md: "md", lg: "lg" }}
              colorScheme="teal"
            >
              Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit your tweet</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Tweet</FormLabel>
                    <Textarea
                      onChange={handletweetChange}
                      placeholder="Enter modified tweet"
                      defaultValue={des}
                    />
                    <SearchGif
                      selectedgif={selectedgif}
                      searchgif={searchgif}
                      mapGifData={mapGifData}
                      setSelectedGif={setSelectedGif}
                      setSearchGif={setSearchGif}
                      setMapGifData={setMapGifData}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => handleEdit(id)}
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
              onClick={() => handleDelete(id)}
              size={{ base: "sm", md: "md", lg: "lg" }}
              colorScheme="red"
            >
              Delete
            </Button>
          </>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default TweetCard;
