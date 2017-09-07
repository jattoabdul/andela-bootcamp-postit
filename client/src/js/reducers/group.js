import {
  CREATE_USER_GROUP,
  GET_USER_GROUPS,
  GETTING_USER_GROUP,
  SET_CURRENT_GROUP,
  SET_MATCHING_USERS,
  ADD_USER_TO_GROUP } from '../actions/types';

const initialState = {
  groups: [],
  currentGroup: {},
  matchedUsers: [],
  isLoadingGroup: false,
  userAdded: false
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_GROUPS:
      return {
        groups: [...action.groups],
        isLoadingGroup: false
      };
    case GETTING_USER_GROUP:
      return {
        isLoadingGroup: action.isLoadingGroup
      };
    case SET_CURRENT_GROUP:
      console.log(action.currentGroup);
      return {
        currentGroup: action.currentGroup
      };
    case CREATE_USER_GROUP:
      return {
        groups: [action.groups, ...state]
      };
    case ADD_USER_TO_GROUP:
      console.log(action.userAdded);
      return {
        userAdded: action.userAdded
      };
    case SET_MATCHING_USERS:
      console.log(action.matchedUsers);
      return {
        matchedUsers: [...action.matchedUsers, ...state]
      };
    default:
      return state;
  }
};
