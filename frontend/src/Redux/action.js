import axios from "axios";
import { API } from "../api/api";
import {
  DELETE_USER,
  EDIT_USER,
  GET_LOCATION,
  GET_POSTS,
  GET_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
} from "./actionType";

export const getPosts = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`${API}/posts`);
    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    console.log({ error });
  }
};
export const userLogin = (payload) => {
  return { type: USER_LOGIN, payload: payload };
};
export const userSignup = (payload) => {
  return { type: USER_SIGNUP, payload: payload };
};
export const userLogout = (payload) => {
  return { type: USER_LOGOUT, payload: payload };
};
export const getUser = (payload) => {
  return { type: GET_USER, payload: payload };
};

export const deleteUser = (payload) => {
  return { type: DELETE_USER, payload: payload };
};
export const editUser = (payload) => {
  return { type: EDIT_USER, payload: payload };
};
export const getCityLocation = (payload) => {
  return { type: GET_LOCATION, payload: payload };
};
