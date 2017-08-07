import constants from "../constants";

const toggleSignupModal = (isOpen) => {
  if (isOpen) {
    return {
      type: constants.CLOSE_SIGNUP_MODAL
    };
  }
  return {
    type: constants.OPEN_SIGNUP_MODAL
  };
};

export default toggleSignupModal;
