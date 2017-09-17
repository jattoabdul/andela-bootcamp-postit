import {
  SET_CURRENT_GROUP,
  REMOVE_CURRENT_GROUP,
  ADD_GROUP_FAIL,
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGES_SUCCESS,
  RECEIVE_MESSAGES_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL } from '../constants';

const initialState = {
  userGroups: [],
  currentGroup: {},
  matchedUsers: [],
  groupError: {},
  addError: {},
  addMsgErr: {},
  groupMessages: [],
  isLoadingMessages: false,
  isAddingMessage: false,
  isLoadingGroups: false,
  userAdded: false
};

const groupData = (state = initialState, action) => {
  const {
    type,
    userGroups,
    groupError,
    addError,
    addMsgErr,
    currentGroup,
    matchedUsers,
    groupMessages,
    isLoadingMessages,
    isAddingMessage,
    message,
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
        groupError,
        isLoadingGroups: false
      };
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup
      };
    case ADD_GROUP_FAIL:
      return {
        ...state,
        addError
      };
    case REMOVE_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: {}
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        isLoadingMessages: !isLoadingMessages,
        groupMessages: []
      };
    case RECEIVE_MESSAGES_SUCCESS:
      return {
        ...state,
        groupMessages: [...groupMessages],
        isLoadingMessages: false
      };
    case RECEIVE_MESSAGES_FAIL:
      return {
        ...state,
        groupMessages: [],
        isLoadingMessages: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        isAddingMessage: !isAddingMessage
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        groupMessages: [...groupMessages, ...message],
        isAddingMessage: false
      };
    case ADD_MESSAGE_FAIL:
      return {
        ...state,
        isAddingMessage: false,
        addMsgErr
      };
    default:
      return state;
  }
};

export default groupData;
