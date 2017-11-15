import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import {
  ResetPassword
} from '../../../client/src/js/components/Main/ResetPassword';

describe('<ResetPassword />', () => {
  const props = testMockData.resetPasswordProps;
  sinon.spy(ResetPassword.prototype, 'onRequestReset');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <ResetPassword {...props} />
      </HashRouter>
    </Provider>);
  wrapper.setState({
    responseMessage: mockData.emptyString,
    requestButtonClassName: 'btn waves-effect waves-light',
    hasStatus: true
  });

  it('should render the ResetPassword component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should check that there are input text field for all parameters', () => {
    expect(wrapper.find('input').first().props().type).toBe('email');
  });

  it('Should check that number of form fields is equal to 1',
    () => {
      expect(wrapper.find('input').length).toBe(1);
    });
  it('Should check that there is a sign in submit button', () => {
    expect(wrapper.find('button').text()).toBe('Reset my password');
    expect(wrapper.find('button').props().type).toBe('submit');
  });
});
