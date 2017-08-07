import { createStore, combineReducers } from "redux";
import { loginUser } from "../reducers";

let store;

export default {
  configure: (initialState) => {
    const reducers = combineReducers({
      loginUser
    });

    if (initialState) {
      store = createStore(
        reducers,
        initialState
      );
      return store;
    }

    store = createStore(
      reducers
    );

    return store;
  },

  currentStore: () => store
};

