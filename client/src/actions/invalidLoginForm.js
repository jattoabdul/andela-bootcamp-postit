import constants from "../constants/";
/**
 *
 * @param {array} fields
 * @returns {object} action
 */
const invalidLoginForm = (fields = ["username", "password"]) => {
  if (fields.length !== 0) {
    return {
      type: constants.SHOW_LOGIN_FORM_ERROR,
      fields
    };
  }
};

export default invalidLoginForm;
