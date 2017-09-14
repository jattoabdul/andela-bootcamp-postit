import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import { ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  SET_CURRENT_GROUP,
  REMOVE_CURRENT_GROUP,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_GROUP_MEMBERS_SUCCESS,
  GET_GROUP_MEMBERS_FAIL } from '../constants';


/**
 * @param {*} empty
 * @return {*} empty
 */
export function getGroup() {
  return {
    type: GET_GROUPS
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function getGroupSuccess(userGroups) {
  return {
    type: GET_GROUPS_SUCCESS,
    userGroups
  };
}

/**
 * @param {*} empty
 * @return {*} empty
 */
export function getGroupFail(groupError) {
  return {
    type: GET_GROUPS_FAIL,
    groupError
  };
}

export const fetchUserGroups = () => (dispatch) => {
  dispatch(getGroup());
  // making call to the get all groups API endpoint
  return Api(null, '/api/v1/groups/', 'GET').then(
    (userGroups) => {
      dispatch(getGroupSuccess(userGroups));
    }
  ).catch((groupError) => {
    dispatch(getGroupFail(groupError));
  });
};

