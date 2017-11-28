import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import {
  BaseDashboard
} from '../../../client/src/js/containers/Dashboard/index';

describe('<BaseDashboard />', () => {
  const props = testMockData.baseDashboardProps;

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <BaseDashboard {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    error: mockData.emptyString,
    userGroups: mockData.userGroups,
    currentGroup: mockData.currentGroup,
    currentGroupMembers: mockData.currentGroupMembers,
    groupMessages: mockData.groupMessages,
    username: mockData.validUsername,
    fullName: mockData.validFullName,
    sideNavStatus: false
  });

  it('should render the BaseDashboard component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a container for the side menu', () => {
    expect(wrapper.find('#appContainer').exists()).toBe(true);
  });

  it('Should check that tthere is a container for the main board content',
    () => {
      expect(wrapper.find('#appBoard').exists()).toBe(true);
    });
});
