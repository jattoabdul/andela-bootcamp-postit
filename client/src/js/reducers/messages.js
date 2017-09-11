import { GET_GROUP_MESSAGES, CREATE_GROUP_MESSAGE } from '../actions/types';

const initialState = {
  groupMessages: [],
  message: null
};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES:
      return {
        groupMessages: [...action.groupMessages]
      };
    case CREATE_GROUP_MESSAGE:
      return {
        groupMessage: [action.groupMessages, ...state]
      };
    default:
      return state;
  }
};
