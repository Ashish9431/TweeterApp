import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../Redux/action";
import "./Navbar.css";

const Navbar = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout(false));
  };
  return (
    <Flex className="nav">
      <Box>
        <Heading as="h1">Tweeter</Heading>
      </Box>
      <Input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <ul>
        <li>
          {isAuth ? (
            <Link>
              <Button
                colorScheme={"teal"}
                variant={"solid"}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </Link>
          ) : (
            <Link to="/">Sign In</Link>
          )}
        </li>
        {isAuth ? (
          ""
        ) : (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
        <li>
          <Link to="/user">User Profile</Link>
        </li>
        <li>
          <Link to="/timeline">Timeline</Link>
        </li>
      </ul>
    </Flex>
  );
};

export default Navbar;
