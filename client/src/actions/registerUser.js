const registerUser = (user) => {
  return {
    type: "REGISTER_USER",
    user
  };
};

export default registerUser;
