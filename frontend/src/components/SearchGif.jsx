import {
  Box,
  Button,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import imageLoader from "../assets/imageLoading.gif";
const SeacthGif = ({
  searchgif,
  mapGifData,
  setSearchGif,
  setSelectedGif,
  setMapGifData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleSearchGif = (e) => {
    setSearchGif(e.target.value);
  };
  const handleSearch = async () => {
    try {
      if (searchgif !== "") {
        let response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=s9ROV9EuwdfMZaLJzVRMq8bWl7b6z4WT&q=${searchgif}&limit=25&offset=0&rating=g&lang=en`
        );
        if(response.data.data.length === 0){
            toast({
              title: "Gif is not available",
              status: "error",
              duration: 1500,
              isClosable: true,
              position: "top",
            });
        }else{
          setMapGifData(response.data.data);
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const selectGif = (e) => {
    setSelectedGif(e.target.src);
    toast({
      title: "Gif Selected!",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };
  const handleGifClose = ()=>{
    setMapGifData([]);
    setSearchGif("");
    onClose();
  }
  return (
    <>
      <Button mt={"10px"} onClick={onOpen} colorScheme={"whatsapp"}>
        Gifs
      </Button>
      <Modal isOpen={isOpen} onClose={handleGifClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Gifs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"10px"}>
              <Input
                onChange={handleSearchGif}
                type={"text"}
                value={searchgif}
                placeholder="Write gif name"
              />
              <Button onClick={handleSearch} colorScheme={"telegram"}>
                Search
              </Button>
            </Flex>
            <SimpleGrid m={"5px auto"} columns={2} spacing={2}>
              {mapGifData.map((elem) => (
                <Box width={"100%"} key={elem.id}>
                  <Image
                    onClick={selectGif}
                    width={"100%"}
                    _hover={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      cursor: "pointer",
                    }}
                    borderRadius={"5px"}
                    src={elem.images.original.url}
                    fallbackSrc={imageLoader}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeacthGif;
