import { combineReducers } from 'redux';
import authData from './auth';
import groupData from './group';

const rootReducer = combineReducers({
  authData,
  groupData
});

export default rootReducer;
