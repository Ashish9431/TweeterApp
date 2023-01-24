import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const initState = {
  posts: [],
  currentUser: {},
  currentLocation: "",
  isAuth: false,
};

export const store = legacy_createStore(
  reducer,
  initState,
  compose(applyMiddleware(thunk))
);

store.subscribe(() => console.log(store.getState()));
