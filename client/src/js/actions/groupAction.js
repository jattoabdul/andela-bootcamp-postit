import jwt from 'jsonwebtoken';
import Api from '../utils/api';
import {
  ADD_GROUP_FAIL,
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  SET_CURRENT_GROUP,
  REMOVE_CURRENT_GROUP,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGES_SUCCESS,
  RECEIVE_MESSAGES_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_GROUP_MEMBERS_SUCCESS,
  GET_GROUP_MEMBERS_FAIL,
  REMOVE_GROUP_MEMBER_SUCCESS,
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL } from '../constants';


/**
 * @param {*} void
 * @return {*} empty
 */
export function getGroup() {
  return {
    type: GET_GROUPS
  };
}

/**
 * @param {*} userGroups
 * @return {*} empty
 */
export function getGroupSuccess(userGroups) {
  return {
    type: GET_GROUPS_SUCCESS,
    userGroups
  };
}

/**
 * @param {*} groupError
 * @return {*} empty
 */
export function getGroupFail(groupError) {
  return {
    type: GET_GROUPS_FAIL,
    groupError
  };
}

/**
 * @param {*} currentGroup
 * @return {*} empty
 */
export function setCurrentGroup(currentGroup) {
  return {
    type: SET_CURRENT_GROUP,
    currentGroup
  };
}

/**
 * @param {*} currentGroupMembers
 * @return {*} empty
 */
export function setCurrentGroupUsersSuccess(currentGroupMembers) {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    currentGroupMembers
  };
}

/**
 * @param {*} groupMembersError
 * @return {*} empty
 */
export function setCurrentGroupUsersFail(groupMembersError) {
  return {
    type: GET_GROUP_MEMBERS_FAIL,
    groupMembersError
  };
}


/**
 * @param {*} void
 * @return {*} empty
 */
export function removeCurrentGroup() {
  return {
    type: REMOVE_CURRENT_GROUP
  };
}

/**
 * @param {*} addError
 * @return {*} empty
 */
export function addGroupFail(addError) {
  return {
    type: ADD_GROUP_FAIL,
    addError
  };
}

/**
 * @param {*} void
 * @return {*} empty
 */
export function getGroupMessages() {
  return {
    type: RECEIVE_MESSAGES
  };
}

/**
 * @param {*} groupMessages
 * @return {*} empty
 */
export function getGroupMessagesSuccess(groupMessages) {
  return {
    type: RECEIVE_MESSAGES_SUCCESS,
    groupMessages
  };
}

/**
 * @param {*} void
 * @return {*} empty
 */
export function addMessage() {
  return {
    type: ADD_MESSAGE
  };
}

/**
 * @param {*} message
 * @return {*} empty
 */
export function addMessageSuccess(message) {
  return {
    type: ADD_MESSAGE_SUCCESS,
    message
  };
}

/**
 * @param {*} addMsgErr
 * @return {*} empty
 */
export function addMessageFail(addMsgErr) {
  return {
    type: ADD_MESSAGE_FAIL,
    addMsgErr
  };
}

/**
 * @param {*} userId
 * @return {*} empty
 */
export function removeGroupMember(userId) {
  return {
    type: REMOVE_GROUP_MEMBER_SUCCESS,
    userId
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

export const createGroup = (name, desc) => (dispatch) => {
  const groupCreateParams = `name=${name}&desc=${desc}`;
  // making calls to the create group API endpoint
  return Api(groupCreateParams, '/api/v1/groups/', 'POST').then(
    (createGroupResponse) => {
      const group = createGroupResponse.group;
      // setting current group to store
      dispatch(setCurrentGroup(group));
      return group;
    }
  ).catch((addError) => {
    dispatch(addGroupFail(addError));
  });
};


  // onSearchUserInGroup Method
export const onSearchUser = (id, searchText) => dispatch => Api(
  null,
  `/api/v1/groups/${id}/usersearch?search=${searchText}`,
  'GET')
  .then(
    userSearchResult => userSearchResult.searchItemResult
  );

  // TODO: fix users in a group and deleting user from group UI & backend
export const setSelectedGroupMembers = groupId => (dispatch) => {
  // TODO: make API call to get users of a group from the server
  return Api(null, `/api/v1/groups/${groupId}/users/`, 'GET').then(
    (currentGroupMembers) => {
      // setting current group members response from server to store
      dispatch(setCurrentGroupUsersSuccess(currentGroupMembers));
      return currentGroupMembers;
    }
  ).catch(
    (groupMembersError) => {
      // setting error response from server when getting members of group
      dispatch(setCurrentGroupUsersFail(groupMembersError));
      return groupMembersError;
    });
};

  // onAddUserToGroup Method
export const onAddUser = (userId, groupId) => (dispatch) => {
  const addUserParams = `userId=${userId}`;
  return Api(addUserParams, `/api/v1/groups/${groupId}/user/`, 'POST').then(
    (addUserToGroupResponse) => {
      // check if response, i.e user added, set message state to "user added"
      // check for users in a group and update UI to add mark icon
      return addUserToGroupResponse;
    }

  );
};

// onAddUserToGroup Method
export const onRemoveUser = (userId, groupId) => (dispatch) => {
  const removeUserParams = `?usersId=${userId}`;
  return Api(null, `/api/v1/groups/${groupId}/user/${removeUserParams}`, 'DELETE').then(
    (removeUserFromGroupResponse) => {
      // call remove groupmember action
      dispatch(removeGroupMember(userId));
      return removeUserFromGroupResponse;
    }
  );
};

export const setSelectedGroupAsCurrent = group => (dispatch) => {
  // setting current group to store
  dispatch(setCurrentGroup(group));
};

export const resetCurrentGroup = () => (dispatch) => {
  // setting current group to store
  dispatch(removeCurrentGroup());
};

const fetchTheMessages = (groupId, dispatch) => {
  dispatch(getGroupMessages());
  return Api(null, `/api/v1/groups/${groupId}/messages/`, 'GET').then(
    (groupMessages) => {
      dispatch(getGroupMessagesSuccess(groupMessages));
      return groupMessages;
    }
  );
};

export const fetchMessages = groupId => dispatch => fetchTheMessages(groupId, dispatch);

export const handleSendMessage = (groupId, priority, text) => (dispatch) => {
  dispatch(addMessage());
  // make Api call to send msg here
  const messageParams = `text=${text}&&priority=${priority}`;
  return Api(messageParams, `/api/v1/groups/${groupId}/message/`, 'POST')
    .then((messageResponse) => {
      dispatch(addMessageSuccess(messageResponse));
      fetchTheMessages(groupId, dispatch);
      return messageResponse;
    });
};
// TODO: fix this and abstract from messageboard component
// export const updateReadBy = id => (dispatch) => {
//   const updateMessageParams = `id=${id}`;
//   const gId = `${this.props.match.params.groupId}`;
//   // make API call to the read message endpoint
//   Api(updateMessageParams, `/api/v1/groups/${gId}/message/read`, 'POST')
//     .then((response) => {
//       console.log('Response: ', response);
//     });
// };

// TODO: fix responsiveness css

// TODO: abstract all other API calls in component
