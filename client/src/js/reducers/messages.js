import { GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE } from '../actions/types';

const initialState = {
  groupMessages: [],
  message: null
};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES:
      return action.groupMessages;
    case CREATE_GROUP_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
};
