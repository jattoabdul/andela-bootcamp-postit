// import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import {
  GET_USER_GROUPS,
  GETTING_USER_GROUP,
  SET_CURRENT_GROUP,
  CREATE_USER_GROUP,
  SET_MATCHING_USERS,
  ADD_USER_TO_GROUP } from './types';

export function createGroup(group) {
  return {
    type: CREATE_USER_GROUP,
    group
  };
}

export function setCurrentGroup(currentGroup) {
  return {
    type: SET_CURRENT_GROUP,
    currentGroup
  };
}

export function getUserGroups(groups) {
  return {
    type: GET_USER_GROUPS,
    groups
  };
}

export function gettingUserGroups() {
  return {
    type: GETTING_USER_GROUP,
    isLoadingGroup: true
  };
}

export function addUser() {
  return {
    type: ADD_USER_TO_GROUP,
    userAdded: true
  };
}

export function setMatchingUsers(matchedUsers) {
  return {
    type: SET_MATCHING_USERS,
    matchedUsers
  };
}

export const sideBarSetCurrentGroup = group => dispatch =>
  dispatch(setCurrentGroup(group));

export const createNewGroup = group => (dispatch) => {
  const groupName = group.groupName,
    groupDesc = group.groupDesc;

  const groupCreateParams = `name=${groupName}&desc=${groupDesc}`;
  // making calls to the create group API endpoint
  return Api(groupCreateParams, '/api/v1/groups/', 'POST').then(
    (res) => {
      // console.log(res);
      // dispatch create group action
      dispatch(createGroup(res.group));
      const currentGroup = res.group;
      // dispatch select current group action
      dispatch(setCurrentGroup(currentGroup));
    }
  );
};

export const fetchUserGroups = () => (dispatch) => {
  dispatch(gettingUserGroups());
  // making call to the get all groups API endpoint
  return Api(null, '/api/v1/groups/', 'GET').then(
    (userGroups) => {
      // console.log('fetching user group', userGroups);
      dispatch(getUserGroups(userGroups));
    }
  );
};

export const searchUser = (groupId, searchText) => (dispatch) => {
  return Api(null,
    `/api/v1/groups/${groupId}/usersearch?search=${searchText}`, 'GET')
    .then(
      (res) => {
        // console.log(res, 'searchUser');
        dispatch(setMatchingUsers(res.searchItemResult));
      }
    );
};

export const addUserToGroup = (groupId, userId) => (dispatch) => {
  const addUserParams = `userId=${userId}`;
  // making calls to the add user group endpoint
  return Api(addUserParams, `/api/v1/groups/${groupId}/user/`, 'POST').then(
    (res) => {
      // console.log(res);
      dispatch(addUser());
    }
  );
};
