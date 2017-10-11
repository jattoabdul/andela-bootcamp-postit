import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      // eslint-disable-next-line
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  ));

export default configureStore;
