import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './types';

/**
 * 
 * @param {*} user 
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * 
 * @param {*} user 
 */
export function removeCurrentUser(user) {
  return {
    type: REMOVE_CURRENT_USER,
    user
  };
}

/**
 * 
 * @param {*} user 
 */
export const logout = user => (dispatch) => {
  sessionStorage.removeItem('user');
  dispatch(removeCurrentUser(user));
};

export const loginRequest = data => (dispatch) => {
  const username = data.username,
    password = data.password;

  if (username !== '' && password !== '') {
    const userString = `username=${username}&password=${password}`;
    return Api(userString, '/api/v1/users/signin', 'POST').then(
      (loginRes) => {
        // set user details in session storage to set headers of request
        sessionStorage.setItem('user', JSON.stringify(loginRes));
        const token = loginRes.token;
        const decodedToken = jwt.decode(token);
        // console.log(decodedToken);
        // setting the current user and adding to store
        dispatch(setCurrentUser(decodedToken));
      });
  }
};
