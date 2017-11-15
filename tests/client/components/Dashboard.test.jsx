import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import {
  Dashboard
} from '../../../client/src/js/containers/Dashboard/Dashboard';

describe('<Dashboard />', () => {
  const props = testMockData.dashboardProps;

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <Dashboard {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    hasShownToaster: false
  });

  it('should render the Dashboard component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a container for welcome message', () => {
    expect(wrapper.find('.welcome').exists()).toBe(true);
  });

  it('Should have an about us section with a title',
    () => {
      expect(wrapper.find('h5 .left-align').text()).toBe('About Us');
    });
});
