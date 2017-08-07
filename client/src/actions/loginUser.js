const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    user
  };
};

export default loginUser;
