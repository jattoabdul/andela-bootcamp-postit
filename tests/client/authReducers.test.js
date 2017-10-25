import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/js/constants';
import authData from './../../client/src/js/reducers/auth';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const expect = chai.expect;

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(authData(undefined, {})).toEqual({
      isAuthenticated: false,
      user: '{}',
      currentUserData: '{}'
    });
  });

  const userDataInStore = {
    isAuthenticated: false,
    user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg3NTk5OTcsImV4cCI6MTUwODg0NjM5N30.ygHMGgxYAemIrTiPUClq_iTVFlcUiEvCAYIaC0G_NuQ","message":"jattoade has successfully logged in"}',
    currentUserData: {
      data: {
        id: 14,
        username: 'jattoade',
        email: 'jattoade@gmail.com',
        fullName: 'Aminujatto Abdulqahhar',
        phoneNumber: '08162740850'
      },
      iat: 1508759997,
      exp: 1508846397
    }
  };

  it('should handle login success', () => {
    expect(
      authData({
        isAuthenticated: false,
        user: '{}',
        currentUserData: '{}'
      }, {
        type: types.LOGIN_USER_SUCCESS,
        isAuthenticated: true,
        userDataInStore
      }));
  });

  it('should handle login fail', () => {
    expect(
      authData({
        isAuthenticated: false,
        user: '{}',
        currentUserData: '{}'
      }, {
        type: types.LOGIN_USER_FAIL,
        isAuthenticated: false,
        user: '{}',
        currentUserData: '{}'
      }));
  });

  it('should set current user to store', () => {
    expect(
      authData({
        isAuthenticated: true,
        user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg3NTk5OTcsImV4cCI6MTUwODg0NjM5N30.ygHMGgxYAemIrTiPUClq_iTVFlcUiEvCAYIaC0G_NuQ","message":"jattoade has successfully logged in"}',
        currentUserData: '{}'
      }, {
        type: types.SET_CURRENT_USER,
        isAuthenticated: true,
        user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg3NTk5OTcsImV4cCI6MTUwODg0NjM5N30.ygHMGgxYAemIrTiPUClq_iTVFlcUiEvCAYIaC0G_NuQ","message":"jattoade has successfully logged in"}',
        currentUserData: {
          data: {
            id: 14,
            username: 'jattoade',
            email: 'jattoade@gmail.com',
            fullName: 'Aminujatto Abdulqahhar',
            phoneNumber: '08162740850'
          },
          iat: 1508759997,
          exp: 1508846397
        }
      }));
  });

  it('should handle logout user', () => {
    expect(
      authData({
        isAuthenticated: true,
        user: '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg3NTk5OTcsImV4cCI6MTUwODg0NjM5N30.ygHMGgxYAemIrTiPUClq_iTVFlcUiEvCAYIaC0G_NuQ","message":"jattoade has successfully logged in"}',
        currentUserData: {
          data: {
            id: 14,
            username: 'jattoade',
            email: 'jattoade@gmail.com',
            fullName: 'Aminujatto Abdulqahhar',
            phoneNumber: '08162740850'
          },
          iat: 1508759997,
          exp: 1508846397
        }
      }, {
        type: types.LOGOUT_USER,
        isAuthenticated: false,
        user: '',
        currentUserData: {
          data: {
            id: 14,
            username: 'jattoade',
            email: 'jattoade@gmail.com',
            fullName: 'Aminujatto Abdulqahhar',
            phoneNumber: '08162740850'
          },
          iat: 1508759997,
          exp: 1508846397
        }
      }));
  });

  it('should remove current user', () => {
    expect(
      authData({
        isAuthenticated: false,
        user: '',
        currentUserData: {
          data: {
            id: 14,
            username: 'jattoade',
            email: 'jattoade@gmail.com',
            fullName: 'Aminujatto Abdulqahhar',
            phoneNumber: '08162740850'
          },
          iat: 1508759997,
          exp: 1508846397
        }
      }, {
        type: types.REMOVE_CURRENT_USER,
        isAuthenticated: false,
        user: '',
        currentUserData: '{}'
      }));
  });
});
