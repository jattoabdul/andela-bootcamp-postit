// createAccount
const initialState = {
  // createAccountModal: "CLOSED",
  currentUser: {
    email: ""
  },
  errorStatus: "CLOSED",
  errorMessage: ""
};

const signUpUser = (state = initialState, action) => {
  switch (action) {
    // case "SHOW_MODAL":
    //   return Object.assign(initialState, { createAccountModal: "OPEN" });
    case "CREATE":
      // return Object.assign(initialState, { currentUser: action.user.email });
      break;
    case "CANCEL":
      // do stuff
      break;
    case "SUCCESS":
      // do stuff
      break;
    case "FAILED":
      // do stuff
      break;
    case "INVALID_FORM":
      // do stuff
      break;
    default:
      return state;
  }
};

export default signUpUser;
