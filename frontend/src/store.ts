import { combineReducers } from "redux";
import { loginReducer } from "./components/Auth/Login/LoginReducer";
import { configureStore } from "@reduxjs/toolkit";
import { isEmpty } from "./utils/isEmpty";
import { setToken } from "./components/Auth/Login/LoginAction";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const { createReduxHistory } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const createRootReducer = combineReducers({
  auth: loginReducer,
});

export const store = configureStore({
  reducer: createRootReducer,
});

export const history = createReduxHistory(store);

// if (!isEmpty(localStorage.getItem("token"))) {
//   store.dispatch(setToken(localStorage.getItem("token")));
// }
// store.dispatch(setToken(localStorage.getItem("token")));
console.log(localStorage.getItem("token"))
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
