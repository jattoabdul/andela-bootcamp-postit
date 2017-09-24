
import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/js/constants';
import * as authData from './../../client/src/js/actions/authAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const expect = chai.expect;

describe('Auth Action', () => {
  describe('Login Success Action', () => {
    it('should dispatch Login Success action', () => {
      // Instantiate the response passed to the action
      const user = {
        token: 'yyyy',
        message: 'login successful'
      };
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: false,
        user: '{}'
      };
      const store = mockStore(initialState);

      // Dispatch the action (loginSuccess)
      store.dispatch(authData.loginSuccess(user));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGIN_USER_SUCCESS, user };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('OnLoginUser Action', () => {
    it('should create loginSuccess action if right message in response', () => {
      // Instantiate the response passed to the action
      const user = {
        username: 'jattoade',
        password: 'jasabs93'
      };

      // Instantiate the response recieved back by the action
      const userLoad = {
        token: 'somethingTokenIsh',
        message: 'login succesful'
      };

      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: false,
        user: '{}'
      };
      const store = mockStore(initialState);

      // Dispatch the Async action (onLoginUser)
      store.dispatch(authData.onLoginUser(user));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGIN_USER_SUCCESS, userLoad };
      expect(actions).toEqual([expectedPayload]);
    });
    // it('should create loginFail action if certain messages in response', () => {

    // });
  });
});
