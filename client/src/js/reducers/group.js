import { cloneDeep } from 'lodash';
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
  REMOVE_GROUP_MEMBER_SUCCESS,
  GET_GROUP_MEMBERS_SUCCESS,
  GET_GROUP_MEMBERS_FAIL,
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
  message: {},
  groupMessages: [],
  currentGroupMembers: [],
  isLoadingMessages: false,
  isAddingMessage: false,
  isLoadingGroups: false,
  userAdded: false
};

const groupData = (state = initialState, action) => {
  const newState = cloneDeep(state);
  const {
    type,
    userGroups,
    groupError,
    addError,
    addMsgErr,
    groupMembersError,
    currentGroup,
    groupMessages,
    currentGroupMembers,
    message,
    isLoadingGroups,
    userId } = action;

  switch (type) {
    case GET_GROUPS:
      return {
        ...newState,
        isLoadingGroups: !isLoadingGroups
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...newState,
        userGroups: [...userGroups],
        isLoadingGroups: false
      };
    case GET_GROUPS_FAIL:
      return {
        ...newState,
        groupError,
        isLoadingGroups: false
      };
    case SET_CURRENT_GROUP:
      return {
        ...newState,
        currentGroup
      };
    case ADD_GROUP_FAIL:
      return {
        ...newState,
        addError
      };
    case REMOVE_CURRENT_GROUP:
      return {
        ...newState,
        currentGroup: {}
      };
    case GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...newState,
        currentGroupMembers: [...currentGroupMembers]
      };
    case GET_GROUP_MEMBERS_FAIL:
      return {
        ...newState,
        groupMembersError
      };
    case REMOVE_GROUP_MEMBER_SUCCESS: {
      const newGroupMembers = newState.currentGroupMembers
        .filter(member => member.id !== userId);
      return {
        ...newState,
        currentGroupMembers: [...newGroupMembers]
      };
    }
    case RECEIVE_MESSAGES:
      return {
        ...newState,
        isLoadingMessages: true,
        groupMessages: []
      };
    case RECEIVE_MESSAGES_SUCCESS:
      return {
        ...newState,
        groupMessages: [...groupMessages],
        isLoadingMessages: false
      };
    case RECEIVE_MESSAGES_FAIL:
      return {
        ...newState,
        groupMessages: [],
        isLoadingMessages: false
      };
    case ADD_MESSAGE:
      return {
        ...newState,
        isAddingMessage: true
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...newState,
        message,
        isAddingMessage: false
      };
    case ADD_MESSAGE_FAIL:
      return {
        ...newState,
        isAddingMessage: false,
        addMsgErr
      };
    default:
      return newState;
  }
};

export default groupData;
