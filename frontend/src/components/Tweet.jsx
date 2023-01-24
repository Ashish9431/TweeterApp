import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
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

const Tweet = () => {
  const [tweet, setTweet] = useState("");
  const currentUser = useSelector((store) => store.currentUser);
  const currentLocation = useSelector((store) => store.currentLocation);
  const [selectedgif, setSelectedGif] = useState("");
  const [searchgif, setSearchGif] = useState("");
  const [mapGifData, setMapGifData] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };
  const handlePost = async () => {
    try {
      if (tweet !== "") {
        let dateAndTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        await axios.post(`${API}/posts`, {
          user_name: currentUser.user_name,
          des: tweet,
          gif_url: selectedgif,
          location: currentLocation,
          timeStamp: dateAndTime,
        });
        toast({
          title: "Tweet posted!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        setSearchGif("");
        setTweet("");
        setSelectedGif("");
        setMapGifData([]);
        dispatch(getPosts());
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "See console for more information",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };
  return (
    <Container p={"20px"} border={"1px solid gainsboro"} borderRadius="10px">
      <Textarea
        borderRadius={"5px"}
        value={tweet}
        placeholder="Write your beautiful tweet..."
        onChange={handleTweetChange}
        size="sm"
      />
      <Flex m={"10px auto"} justify={"space-between"}>
        <SearchGif
          searchgif={searchgif}
          mapGifData={mapGifData}
          setSelectedGif={setSelectedGif}
          setSearchGif={setSearchGif}
          setMapGifData={setMapGifData}
        />
        <Button onClick={handlePost} colorScheme={"teal"}>
          Post
        </Button>
      </Flex>
    </Container>
  );
};

export default Tweet;
