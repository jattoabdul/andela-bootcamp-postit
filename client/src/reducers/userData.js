const userData = (state = "{}", action) => {
  const { type, user } = action;
  switch (type) {
    case "LOGIN_USER":
      return user;
    case "LOGOUT_USER":
      return "{}";
    default:
      return state;
  }
};

export default userData;
