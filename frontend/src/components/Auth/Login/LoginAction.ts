import axios from "axios";
// import { push } from "react-router-redux";
import { toast } from "react-toastify";
import { SET_TOKEN, UNSET_TOKEN } from "./LoginReducer";
import { setAxiosAuthToken, toastOnError } from "../../../utils/authToken";
import { API_URL } from "../../../services/Tasks";
import { history } from "../../../store";


export interface IUserData {
  username: string
  password: string
}

export const login = (userData: IUserData, redirectTo: string) => {
  console.log(`login 0 - ${userData}`)
  return (dispatch: any) => {
    console.log("login 1");
    axios
      .post(`${API_URL}/api/login/`, userData)
      .then((response) => {
        const { access_token } = response.data;
        console.log(`login 2 - ${access_token}`);
        setAxiosAuthToken(access_token);
        dispatch(setToken(access_token));
      })
      .catch((error) => {
        dispatch(unsetToken());
        toastOnError(error);
      });
  };
};


export const setToken = (token: any) => (dispatch: any) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  console.log(`login 4 - ${localStorage.getItem("token")}`);
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
  console.log("login 5 - setToken is over");
  dispatch(history.push('/'))
};

export const  unsetToken = () => (dispatch: any) => {
  setAxiosAuthToken("");
  console.log('in unsetToken')
  localStorage.removeItem("token");
  dispatch({
    type: UNSET_TOKEN,
  });
};

export const logout = () => (dispatch: any) => {
  axios
    .post(`${API_URL}/api/logout/`)
    .then((response) => {
      console.log('in logout')
      dispatch(unsetToken());
      toast.success("Logout successful.");
      console.log('success logout')
    })
    .catch((error) => {
      toastOnError(error);
    });
};
