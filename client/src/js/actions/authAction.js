import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  LOGOUT_USER } from '../constants';


/**
 * @param {*} user
 * @return {object} action
 */
export function loginSuccess(user) {
  return {
    type: LOGIN_USER_SUCCESS,
    user
  };
}

/**
 * @param {*} user
 * @return {object} action
 */
export function loginFail(user) {
  return {
    type: LOGIN_USER_FAIL,
    user
  };
}

/**
 * @param {*} currentUserData
 * @return {object} action
 */
export function setCurrentUser(currentUserData) {
  return {
    type: SET_CURRENT_USER,
    currentUserData
  };
}

/**
 * @param {*} empty
 * @return {object} action
 */
export function removeCurrentUser() {
  return {
    type: REMOVE_CURRENT_USER
  };
}

/**
 * @param {*} empty
 * @return {object} type
 */
export function logoutSuccess() {
  return {
    type: LOGOUT_USER
  };
}

/**
 * 
 * @param {*} user
 * @return {void}
 */
export const onLoginUser = user => (dispatch) => {
  const { username, password } = user;
  // const username = user.username,
  //   password = user.password;
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
    }).catch(
    (error) => { throw error; }
  );
};

/**
 * 
 * @param {*} userData
 * @return {void}
 */
export const onRegisterUser = userData => () => {
  const { username, fullName, email, password, phoneNumber } = userData;
  const userString = `username=${username}&fullName=${fullName}&email=${email}
      &password=${password}&phoneNumber=${phoneNumber}`;
  return Api(userString, '/api/v1/users/signup', 'POST', null);
};

/**
 * @return {void}
 */
export const onLogoutUser = () => (dispatch) => {
  sessionStorage.removeItem('user');
  dispatch(logoutSuccess());
  dispatch(removeCurrentUser());
};

/**
 * @return {void}
 */
export const setCurrentUserData = () => (dispatch) => {
  const token = sessionStorage.getItem('user').token;
  const decodedToken = jwt.decode(token);
  dispatch(setCurrentUser(decodedToken));
};


/**
 * @param {string} email
 * @return {void}
 */
export const requestResetPassword = email => () => {
  const emailString = `email=${email}`;
  return Api(emailString, '/api/v1/users/reset/request/', 'POST', null);
};


/**
 * @param {string} password
 * @param {string} hash
 * @return {void}
 */
export const updatePassword = (password, hash) => () => {
  const passwordString = `password=${password}`;
  return Api(passwordString, `/api/v1/users/reset/${hash}/`, 'POST', null);
};
