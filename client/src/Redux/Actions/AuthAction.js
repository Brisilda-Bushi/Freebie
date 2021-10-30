import { authType } from '../ActionTypes';
import * as api from "../../Api/Api"
import axios from "axios";
import { errorType } from "../ActionTypes";
import Swal from 'sweetalert2'

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: authType.AUTH, data });

    router.push('/');
  } catch (error) {
    if(error.message === "Request failed with status code 404"){
      Swal.fire(
        'No user found!',
        "User doesn't exist, check your email address and make sure you have been verified!",
        'error'
      )
      console.log("FAILURE NO USER");
      } else if(error.message === "Request failed with status code 400"){
        Swal.fire(
          'Invalid Credentials!',
          'You have not used valid credentials, please try again!',
          'error'
        )
        console.log("FAILURE INVALID CREDENTIALS");
      }else {
        console.log(JSON.stringify(error));
      }
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: authType.AUTH, data });
    Swal.fire(
      'Thank you!',
      'Your registration is complete! Please check your email address for a verification code!',
      'success'
    )
    console.log("SUCCESS! EMAIL SENT");

    router.push('/auth');
  } catch (error) {
    if(error.message === "Request failed with status code 403"){
      Swal.fire(
        'No Match!',
        'Repeat Password has to match Password!',
        'error'
      )
    console.log("FAILURE RE-PASSWORD");
    } else if(error.message === "Request failed with status code 409"){
      Swal.fire(
        'User Exists!',
        'User already exists, try to login!',
        'error'
      )
      console.log("FAILURE USER EXISTS");
    }else {
      console.log(JSON.stringify(error));
    }
  }
  
};

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: authType.USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: authType.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch((msg, status, id = null) => {
        return {
          type: errorType.GET_ERRORS,
          payload: { msg, status, id },
        };
      });
      dispatch({
        type: authType.AUTH_ERROR,
      });
    });
};

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(user);
    console.log("data in auth action", data)
    dispatch({ type: authType.USER_UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};