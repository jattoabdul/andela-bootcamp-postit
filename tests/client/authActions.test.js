import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import chaiFetchMock from 'chai-fetch-mock';
import * as types from '../../client/src/js/constants';
import * as authData from './../../client/src/js/actions/authAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
chai.use(chaiFetchMock);
const expects = chai.expect;

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

  describe('Set Current User Action', () => {
    it('should dispatch setCurrentUser action', () => {
      // Instantiate the response passed to the action
      const currentUserData = {
        data: {
          email: 'jattoade@gmail.com',
          fullName: 'Aminujatto Abdulqahhar',
          id: 14,
          phoneNumber: '08162740850',
          username: 'jattoade'
        },
        exp: 1508589912,
        iat: 1508503512
      };

      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg1MDM1MTIsImV4cCI6MTUwODU4OTkxMn0.W01Xjf3f1UpReT-qfX6RbncKxIfhamo9GSVOWV16uI8","message":"jattoade has successfully logged in"}',
        currentUserData: '{}'
      };

      const store = mockStore(initialState);

      // Dispatch the action (loginFail)
      store.dispatch(authData.setCurrentUser(currentUserData));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.SET_CURRENT_USER, currentUserData };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('Remove Current User Action', () => {
    it('should dispatch removeCurrentUser action', () => {
      // Instantiate the response passed to the action
      const currentUserData = {
        data: {
          email: 'jattoade@gmail.com',
          fullName: 'Aminujatto Abdulqahhar',
          id: 14,
          phoneNumber: '08162740850',
          username: 'jattoade'
        },
        exp: 1508589912,
        iat: 1508503512
      };

      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg1MDM1MTIsImV4cCI6MTUwODU4OTkxMn0.W01Xjf3f1UpReT-qfX6RbncKxIfhamo9GSVOWV16uI8","message":"jattoade has successfully logged in"}',
        currentUserData
      };

      const store = mockStore(initialState);

      // Dispatch the action (loginFail)
      store.dispatch(authData.removeCurrentUser());

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.REMOVE_CURRENT_USER };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('Register a User', () => {
    const args = {
      method: 'post',
      body: {
        email: 'jattosharifah@gmail.com',
        fullName: 'Aminujatto Sharifah',
        phoneNumber: '08055370900',
        username: 'sharifah',
        password: 'sharifah'
      }
    };
    const userData = {
      email: 'jattosharifah@gmail.com',
      fullName: 'Aminujatto Sharifah',
      phoneNumber: '08055370900',
      username: 'sharifah',
      password: 'sharifah'
    };

    // mock fetch api calls
    before(() => fetchMock.post('/api/v1/users/signup', userData));

    it('should call the register user api endpoint with the user data', () => {
      fetch('/api/v1/users/signup', args).then(() => {
        expects(fetchMock).route('/api/v1/users/signup').to.have.been.called;
      });
    });

    after(() => fetchMock.restore());
  });
});
