import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import { Home } from '../../../client/src/js/components/Main';

describe('<Home />', () => {
  const wrapper = mount(<HashRouter><Home /></HashRouter>);
  it('should render the home component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have two buttons', () => {
    expect(wrapper.find('.btn').exists()).toBe(true);
  });

  it('should have ion-speakerphone', () => {
    expect(wrapper.find('.ion-speakerphone').exists()).toBe(true);
  });
});
