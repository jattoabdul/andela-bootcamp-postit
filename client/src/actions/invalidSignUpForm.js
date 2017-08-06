import constants from "../constants";
/**
 *
 * @param {array} fields
 * @returns {object} action
 */

const invalidSignupForm = (fields = ["username", "password", "email"]) => {
  if (fields.length !== 0) {
    return {
      type: constants.SHOW_SIGNUP_FORM_ERROR,
      fields
    };
  }
};

export default invalidSignupForm;
