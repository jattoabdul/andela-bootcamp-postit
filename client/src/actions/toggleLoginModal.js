import constants from "../constants";

const toggleLoginModal = (isOpen) => {
  if (isOpen) {
    return {
      type: constants.CLOSE_LOGIN_MODAL
    };
  }
  return {
    type: constants.OPEN_LOGIN_MODAL
  };
};

export default toggleLoginModal;
