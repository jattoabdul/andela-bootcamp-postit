import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/js/constants';
import * as groupData from './../../client/src/js/actions/groupAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const expect = chai.expect;
