import constants from "../constants";
/**
 *
 * @param {object} user
 * @returns {object} action
 */
const login = (user) => {
  if (user) {
    return {
      type: constants.LOGIN_USER,
      user
    };
  }
};

export default login;
