import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import {
  SideMenu
} from '../../../client/src/js/components/Partials/SideMenu';

describe('<SideMenu />', () => {
  const props = testMockData.sideMenuProps;

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <SideMenu {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    error: mockData.emptyString,
    userGroups: mockData.userGroups,
    currentGroup: mockData.currentGroup,
    username: mockData.validUsername,
    fullName: mockData.validFullName,
    activeClassList: false,
    activeClassAnchor: false
  });

  it('should render the SideMenu component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is an image tag with the user\'s avatar', () => {
    expect(wrapper.find('img').props().alt).toBe('Profile');
  });

  it('Should check that there is a ul to hold all group list items', () => {
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('ul').exists()).toBe(true);
  });
});
