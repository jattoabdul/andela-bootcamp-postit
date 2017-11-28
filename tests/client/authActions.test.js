import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import chaiFetchMock from 'chai-fetch-mock';
import * as types from '../../client/src/js/constants';
import * as authData from './../../client/src/js/actions/authAction';

// import mock data
import mockData from '../__mock__/dummy';
import mockTestData from '../__mock__/testDummy';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
chai.use(chaiFetchMock);
const expects = chai.expect;

describe('Auth Action', () => {
  describe('Login Success Action', () => {
    it('should create an action and Successfully Login a user ' +
    'when action type LOGIN_USER_SUCCESS is dispatched', () => {
      // Instantiate the response passed to the action
      const user = {
        token: mockData.staticToken,
        message: 'login successful'
      };
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: false,
        user: '{}',
        currentUserData: {}
      };
      const store = mockStore(initialState);

      // Dispatch the action
      store.dispatch(authData.loginSuccess(user));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: 'LOGIN_USER_SUCCESS',
          user: { token: mockData.staticToken, message: 'login successful' }
        }]);
    });

    it('should create an action and set Current User ' +
    'when action type SET_CURRENT_USER is dispatched', () => {
      // Instantiate the response passed to the action
      const currentUserData = {
        token: mockData.staticToken,
        message: 'login successful'
      };
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        currentUserData
      };

      const store = mockStore(initialState);

      // Dispatch the action
      store.dispatch(authData.setCurrentUser(currentUserData));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = {
        type: types.SET_CURRENT_USER,
        currentUserData
      };
      expect(actions).toEqual([expectedPayload]);
    });

    after(() => fetchMock.restore());
  });

  describe('Login Fail Action', () => {
    it('should create an action and Fail to Login a user ' +
    'when action type LOGIN_USER_FAIL is dispatched', () => {
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

      // Dispatch the action
      store.dispatch(authData.loginFail(user));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGIN_USER_FAIL, user };
      expect(actions).toEqual([expectedPayload]);
    });
  });
  describe('Logout Success Action', () => {
    it('should create an action and logout a user Successfully ' +
    'when action type LOGOUT_USER is dispatched', () => {
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: '{}'
      };

      const store = mockStore(initialState);

      // Dispatch the action
      store.dispatch(authData.logoutSuccess());

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = { type: types.LOGOUT_USER };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('Set Current User Action', () => {
    it('should create an action and set Current User Successfully ' +
    'when action type SET_CURRENT_USER is dispatched', () => {
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: `{"token":"${mockData.staticToken}",
          "message":"jattoade has successfully logged in"}`,
        currentUserData: '{}'
      };

      const store = mockStore(initialState);

      // Dispatch the action
      store.dispatch(authData.setCurrentUser(mockTestData.currentUserData));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = {
        type: types.SET_CURRENT_USER,
        currentUserData: mockTestData.currentUserData };
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('Remove Current User Action', () => {
    it('should create an action and remove Current User Successfully ' +
    'when action type REMOVE_CURRENT_USER is dispatched', () => {
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: true,
        user: `{"token":"${mockData.staticToken}",
        "message":"jattoade has successfully logged in"}`,
        currentUserData: mockTestData.currentUserData
      };

      const store = mockStore(initialState);

      // Dispatch the action
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
        email: mockData.validEmailTwo,
        fullName: mockData.validFullNameTwo,
        phoneNumber: mockData.validPhoneNumberTwo,
        username: mockData.validUsernameTwo,
        password: mockData.validPasswordTwo
      }
    };
    const userData = {
      email: mockData.validEmailTwo,
      fullName: mockData.validFullNameTwo,
      phoneNumber: mockData.validPhoneNumberTwo,
      username: mockData.validUsernameTwo,
      password: mockData.validPasswordTwo
    };

    // mock fetch api calls
    before(() => fetchMock.post('/api/v1/users/signup', userData));

    it('should call the register user api endpoint with the user data', () => {
      fetch('/api/v1/users/signup', args)
        .then(() => expects(fetchMock)
          .route('/api/v1/users/signup').to.have.been.called);
    });

    after(() => fetchMock.restore());
  });

  describe('Password Reset', () => {
    const args = {
      method: 'post',
      body: {
        email: mockData.validEmailTwo
      }
    };
    const email = mockData.validEmailTwo;

    // mock fetch api calls
    before(() => fetchMock.post('/api/v1/users/reset/request', email));

    it('should call requestResetPaassword method and make api call', () => {
      // Initialize mockstore with empty/initial state
      const initialState = {
        isAuthenticated: false,
        user: ''
      };

      const store = mockStore(initialState);

      // Dispatch the action
      store.dispatch(authData.requestResetPassword(email));

      // Test if your store dispatched the expected actions
      const actions = store.getActions();
      const expectedPayload = [];
      expect(actions).toEqual(expectedPayload);
    });

    it('should requestResetPassword',
      () => fetch('/api/v1/users/reset/request', args)
        .then(() => expects(fetchMock)
          .route('/api/v1/users/reset/request').to.have.been.called)
    );

    describe('Update Password', () => {
      const argz = {
        method: 'post',
        body: {
          password: mockData.validPasswordTwo
        }
      };
      const password = mockData.validPasswordTwo;
      const hash = '';

      // mock fetch api calls
      before(() => fetchMock.post(`/api/v1/users/reset/${hash}`, password));

      it('should call updatePassword method and make api call', () => {
      // Initialize mockstore with empty/initial state
        const initialState = {
          isAuthenticated: false,
          user: ''
        };

        const store = mockStore(initialState);

        // Dispatch the action
        store.dispatch(authData.updatePassword(password, hash));

        // Test if your store dispatched the expected actions
        const actions = store.getActions();
        const expectedPayload = [];
        expect(actions).toEqual(expectedPayload);
      });

      it('should updatePassword', () => {
        fetch(`/api/v1/users/reset/${hash}`, argz)
          .then(() => expects(fetchMock)
            .route(`/api/v1/users/reset/${hash}`).to.have.been.called);
      });
    });
  });
});
