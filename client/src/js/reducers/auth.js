import isEmpty from 'lodash/isEmpty';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  LOGOUT_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: '{}',
  currentUserData: '{}'
};

const authData = (state = initialState, action) => {
  const { type, user, currentUserData } = action;
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUserData
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: initialState.isAuthenticated,
        user: '{}'
      };
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUserData: '{}'
      };
    default:
      return state;
  }
};

export default authData;

// return Object.assign(initialState, {
//     isAuthenticated: !isEmpty(user),
//     user
// });

