import axios from 'axios';
import * as actiontTypes from './actionsTypes';

export const authStart = () => {
  return {
    type: actiontTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actiontTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actiontTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    console.log(authData);

    const url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_jkUkPfTFOLiLCe2UIhGw2Zwd2Hd0r7w'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_jkUkPfTFOLiLCe2UIhGw2Zwd2Hd0r7w';

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail());
      });
  };
};
