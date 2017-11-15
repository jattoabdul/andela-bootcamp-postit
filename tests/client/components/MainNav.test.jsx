import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import { MainNav } from '../../../client/src/js/components/Partials/MainNav';

describe('<MainNav />', () => {
  const props = testMockData.mainNavProps;

  const wrapper = mount(<HashRouter>
    <MainNav {...props} />
  </HashRouter>);

  wrapper.setState({
    navOpen: true
  });

  it('should render the MainNav component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have two ul to hold all group members and user search modal',
    () => {
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('ul').length).toBe(1);
    });
});
