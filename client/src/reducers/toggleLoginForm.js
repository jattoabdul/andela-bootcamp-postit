import constants from "../constants";

const initialState = {
  loginFormIsOpen: false
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case constants.OPEN_LOGIN_MODAL:
      console.log(`OPEN_LOGIN_MODAL: ${action}`);
      newState.loginFormIsOpen = true;
      return newState;
    case constants.CLOSE_LOGIN_MODAL:
      console.log(`CLOSE_LOGIN_MODAL: ${action}`);
      newState.loginFormIsOpen = false;
      return newState;
    default:
      return state;
  }
};
