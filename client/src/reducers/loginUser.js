import constants from '../constants';

const initialState = {
  isLoggedIn: false
};
const loginUser = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.LOGIN_USER:
      // console.log(`LOGIN_USER:  + ${action}`);
      newState.isLoggedIn = !initialState.isLoggedIn;
      return newState;
    default:
      return state;
  }
};
export default loginUser;
