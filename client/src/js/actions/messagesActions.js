import Api from './../utils/api';
import {
  GET_GROUP_MESSAGES,
  CREATE_GROUP_MESSAGE } from './types';

// Create group message
export function createGroupMessage(message) {
  return {
    type: CREATE_GROUP_MESSAGE,
    message
  };
}

// Get group messages
export function getGroupMessages(messages) {
  return {
    type: GET_GROUP_MESSAGES,
    messages
  };
}


// Create group message
export const createNewGroupMessage = message => (dispatch) => {
  const messageText = message.text,
    messagePriority = message.priority;
  const gId = `${this.props.match.params.groupId}`;
  const messageCreateParams = `text=${messageText}&priority=${messagePriority}`;
  // making calls to the create group API endpoint
  return Api(messageCreateParams, `/api/v1/groups/${gId}/message/`, 'POST')
    .then((messageResponse) => {
      // dispatch create group message action
      dispatch(createGroupMessage(messageResponse));
    });
};


// Get group messages
export const getGroupMessage = () => (dispatch) => {
  // TODO: dispatch a getting message action
  const gId = `${this.props.match.params.groupId}`;
  // making calls to the create group API endpoint
  return Api(null, `/api/v1/groups/${gId}/messages/`, 'GET')
    .then((groupMessagesResponse) => {
    //   console.log('fetching user group', groupMessagesResponse);
      // dispatch get group messages action
      dispatch(getGroupMessages(groupMessagesResponse));
    });
};
