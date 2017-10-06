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
  describe('on setCurrentUser Action', () => {
    it('should add current user to the store as currentUser', () => {
      
    });
  });
});
