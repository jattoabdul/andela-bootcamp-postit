import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import login from './reducers/login';
import group from './reducers/group';
import messages from './reducers/messages';

export default combineReducers({
  flashMessages,
  login,
  group,
  messages
});
