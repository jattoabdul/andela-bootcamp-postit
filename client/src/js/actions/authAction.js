import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  LOGOUT_USER } from '../constants';


/**
 * @param {*} empty
 * @return {*} empty
 */
export function loginSuccess(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    user
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function loginFail(user) {
  return {
    type: LOGIN_USER_FAIL,
    user
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function setCurrentUser(currentUserData) {
  return {
    type: SET_CURRENT_USER,
    currentUserData
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT_USER
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function logoutSuccess() {
  return {
    type: LOGOUT_USER
  };
}


export const onLoginUser = user => (dispatch) => {
  const username = user.username,
    password = user.password;
  const userString = `username=${username}&password=${password}`;
  return Api(userString, '/api/v1/users/signin', 'POST', null).then(
    (loginRes) => {
      if (loginRes.message === 'username does not exist') {
        // dispatch a login error action
        dispatch(loginFail(JSON.stringify(loginRes)));
        return;
      }
      if (loginRes.message === 'invalid password') {
        // dispatch a login error action
        dispatch(loginFail(JSON.stringify(loginRes)));
        return;
      }
      // dispath a login success action
      dispatch(loginSuccess(JSON.stringify(loginRes)));
      sessionStorage.setItem('user', JSON.stringify(loginRes));

      // window.location = '/#/dashboard';
      const token = loginRes.token;
      const decodedToken = jwt.decode(token);
      dispatch(setCurrentUser(decodedToken));
    });
};


export const onRegisterUser = userData => (dispatch) => {
  const username = userData.username,
    fullName = userData.fullName,
    email = userData.email,
    password = userData.password,
    phoneNumber = userData.phoneNumber;
  const userString = `username=${username}&fullName=${fullName}&email=${email}
      &password=${password}&phoneNumber=${phoneNumber}`;
  return Api(userString, '/api/v1/users/signup', 'POST', null);
};

export const onLogoutUser = () => (dispatch) => {
  sessionStorage.removeItem('user');
  dispatch(logoutSuccess());
  dispatch(removeCurrentUser());
};

export const setCurrentUserData = () => (dispatch) => {
  const token = sessionStorage.getItem('user').token;
  const decodedToken = jwt.decode(token);
  dispatch(setCurrentUser(decodedToken));
};
