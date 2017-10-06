import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import chai from 'chai';
import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
// import configureStore from 'redux-mock-store';
import { Home,
  Register,
  Login,
  ResetPassword,
  UpdatePassword,
  NotFound } from '../../client/src/js/components/main';
import { Welcome,
  SideMenu,
  MainNav,
  UserView,
  MessageList,
  MessageBody,
  MessageItem,
  MessageInputForm } from '../../client/src/js/components/partials';
import { BaseDashboard } from '../../client/src/js/containers/dashboard/index.jsx';
import {
  Dashboard } from '../../client/src/js/containers/dashboard/dashboard.jsx';
import {
  MessageBoard
} from '../../client/src/js/containers/dashboard/messageboard.jsx';
import {
  AddUserToGroupBoard
} from '../../client/src/js/containers/dashboard/addUserToGroup.jsx';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const expect = chai.expect;

describe('Components', () => {
  // describe('<Home /> Component', () => {
  //   it('should be defined', () => {
  //     expect(Home).toBeDefined();
  //   });
  // });
});
