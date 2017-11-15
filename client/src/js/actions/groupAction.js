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
  GET_GROUP_MEMBERS_SUCCESS,
  GET_GROUP_MEMBERS_FAIL,
  REMOVE_GROUP_MEMBER_SUCCESS,
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL } from '../constants';


/**
 * @param {null} void
 * @return {object} type
 */
export function getGroup() {
  return {
    type: GET_GROUPS
  };
}

/**
 * @param {object} userGroups
 * @return {object} type & userGroups
 */
export function getGroupSuccess(userGroups) {
  return {
    type: GET_GROUPS_SUCCESS,
    userGroups
  };
}

/**
 * @param {object} groupError
 * @return {object} type & groupError
 */
export function getGroupFail(groupError) {
  return {
    type: GET_GROUPS_FAIL,
    groupError
  };
}

/**
 * @param {object} currentGroup
 * @return {object} type and currentGroup
 */
export function setCurrentGroup(currentGroup) {
  return {
    type: SET_CURRENT_GROUP,
    currentGroup
  };
}

/**
 * @param {object} currentGroupMembers
 * @return {object} empty
 */
export function setCurrentGroupUsersSuccess(currentGroupMembers) {
  return {
    type: GET_GROUP_MEMBERS_SUCCESS,
    currentGroupMembers
  };
}

/**
 * @param {object} groupMembersError
 * @return {object} empty
 */
export function setCurrentGroupUsersFail(groupMembersError) {
  return {
    type: GET_GROUP_MEMBERS_FAIL,
    groupMembersError
  };
}


/**
 * @param {*} void
 * @return {object} empty
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
/**
 * @return {void}
 */
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

/**
 * 
 * @param {*} name 
 * @param {*} desc
 * @return {void}
 */
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
    throw addError;
  });
};

  /**
   * onSearchUserInGroup Method
   * 
   * @param {*} id
   * @param {*} searchText
   * @param {string} page
   * 
   * @return {void}
   */
export const onSearchUser = (id, searchText, page) => () => Api(
  null,
  `/api/v1/groups/${id}/${page}/usersearch?search=${searchText}`,
  'GET')
  .then(
    userSearchResult => userSearchResult.searchItemResult
  );

  /**
   * 
   * @param {*} groupId
   * 
   * @return {void}
   */
export const setSelectedGroupMembers = groupId => dispatch =>

  // make API call to get users of a group from the server
  Api(null, `/api/v1/groups/${groupId}/users/`, 'GET').then(
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
    })
;

/**
   * onAddUserToGroup Method
   * 
   * @param {*} userId 
   * @param {*} groupId
   * 
   * @return {object} addUserToGroupResponse
   */
export const onAddUser = (userId, groupId) => (dispatch) => {
  const addUserParams = `userId=${userId}`;
  return Api(addUserParams, `/api/v1/groups/${groupId}/user/`, 'POST').then(
    () => {
      dispatch(setSelectedGroupMembers(groupId));
    }
  );
};

/**
 * onAddUserToGroup Method
 * 
 * @param {*} userId 
 * @param {*} groupId 
 * 
 * @return {object} removeUserFromGroupResponse
 */
export const onRemoveUser = (userId, groupId) => (dispatch) => {
  const removeUserParams = `?usersId=${userId}`;
  return Api(
    null,
    `/api/v1/groups/${groupId}/user/${removeUserParams}`,
    'DELETE')
    .then(
      (removeUserFromGroupResponse) => {
        if (removeUserFromGroupResponse.message ===
          'User Is not an Admin' || 'You cannot remove yourself') {
          return removeUserFromGroupResponse;
        }

        // call remove groupmember action
        dispatch(removeGroupMember(userId));
        return removeUserFromGroupResponse;
      }
    );
};

/**
 * setSelectedGroupAsCurrent
 * 
 * @param {*} group
 * 
 * @return {void}
 */
export const setSelectedGroupAsCurrent = group => (dispatch) => {
  // setting current group to store
  dispatch(setCurrentGroup(group));
};

/**
 * resetCurrentGroup
 * 
 * @param {empty} void
 * 
 * @return {void}
 */
export const resetCurrentGroup = () => (dispatch) => {
  // setting current group to store
  dispatch(removeCurrentGroup());
};

/**
 * 
 * @param {*} groupId 
 * @param {*} dispatch
 * 
 * @return {object} groupMessages
 */
const fetchTheMessages = (groupId, dispatch) => {
  dispatch(getGroupMessages());
  return Api(null, `/api/v1/groups/${groupId}/messages/`, 'GET').then(
    (groupMessages) => {
      dispatch(getGroupMessagesSuccess(groupMessages));
      return groupMessages;
    }
  );
};

/**
 * fetchMessages
 * 
 * @param {*} groupId
 * 
 * @return {object} messageResponse
 */
export const fetchMessages = groupId => dispatch =>
  fetchTheMessages(groupId, dispatch);

/**
 * handleSendMessage
 * 
 * @param {*} groupId 
 * @param {*} priority 
 * @param {*} text
 * 
 * @return {object} messageResponse
 */
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
