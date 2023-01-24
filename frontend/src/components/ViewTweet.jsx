import { Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/action";
import TweetCard from "./TweetCard";

const ViewTweet = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Flex
      direction={"column"}
      w={{ base: "100%", md: "50%", lg: "50%", xl: "35%" }}
      margin={"10px auto"}
      gap={"10px"}
      align={"center"}
    >
      {posts.map((elem) => (
        <TweetCard
          key={elem.id}
          gif={elem.gif_url}
          user_name={elem.user_name}
          id={elem.id}
          des={elem.des}
          location={elem.location}
          timeStamp={elem.timeStamp}
        />
      ))}
    </Flex>
  );
};

export default ViewTweet;
