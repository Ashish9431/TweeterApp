import { Box } from "@chakra-ui/react";
import React from "react";
import Tweet from "../components/Tweet";
import ViewTweet from "../components/ViewTweet";

const Timeline = () => {
  return (
    <Box mt={"5rem"}>
      <Tweet />
      <ViewTweet />
    </Box>
  );
};

export default Timeline;
