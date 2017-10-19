
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

    it('should dispatch setCurrentUser action', () => {
      // Instantiate the response passed to the action
      const currentUserData = {
        token: 'yyyy',
        message: 'login successful'
      };
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        currentUserData
      };

      const store = mockStore(initialState);

      // Dispatch the action (loginSuccess)
      store.dispatch(authData.setCurrentUser(currentUserData));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = {
        type: types.SET_CURRENT_USER,
        currentUserData
      };
      expect(actions).toEqual([expectedPayload]);
    });
  });
  describe('Login Fail Action', () => {
    it('should dispatch Login Fail action', () => {
      // Instantiate the response passed to the action
      const user = {
        isAuthenticated: false,
        message: 'login fail'
      };
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: false,
        user: '{}'
      };
      const store = mockStore(initialState);

      // Dispatch the action (loginFail)
      store.dispatch(authData.loginFail(user));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGIN_USER_FAIL, user };
      expect(actions).toEqual([expectedPayload]);
    });
  });
  describe('Logout Success Action', () => {
    it('should dispatch logoutSuccess action', () => {
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: '{}'
      };

      const store = mockStore(initialState);

      // Dispatch the action (loginFail)
      store.dispatch(authData.logoutSuccess());

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGOUT_USER };
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
