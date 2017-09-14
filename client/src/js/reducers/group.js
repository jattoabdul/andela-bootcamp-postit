import Api from '../utils/api';
import {
  SET_CURRENT_GROUP,
  REMOVE_CURRENT_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL } from '../constants';

const initialState = {
  userGroups: [],
  currentGroup: {},
  matchedUsers: [],
  groupError: {},
  isLoadingGroups: false,
  userAdded: false
};

const groupData = (state = initialState, action) => {
  const {
    type,
    userGroups,
    groupError,
    currentGroup,
    matchedUsers,
    isLoadingGroups,
    userAdded } = action;

  switch (type) {
    case GET_GROUPS:
      return {
        ...state,
        isLoadingGroups: !isLoadingGroups
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: [...userGroups],
        isLoadingGroups: false
      };
    case GET_GROUPS_FAIL:
      return {
        ...state,
        userGroups,
        isLoadingGroups: false
      };
    default:
      return state;
  }
};

export default groupData;
