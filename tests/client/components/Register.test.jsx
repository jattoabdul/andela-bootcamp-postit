import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import { Register } from '../../../client/src/js/components/Main/Register';

describe('<Register />', () => {
  const props = testMockData.registerProps;

  sinon.spy(Register.prototype, 'onRegisterUser');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <Register {...props} />
      </HashRouter>
    </Provider>);
  wrapper.setState({
    username: mockData.validUsername,
    fullName: mockData.fullName,
    email: mockData.validEmail,
    phoneNumber: mockData.phoneNumber,
    password: mockData.validPassword,
    confirmPassword: mockData.validPassword,
    error_message: '',
    hasError: false,
    isLoading: true
  });
  it('should render the Register component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should contain the onRegisterUser method', () => {
    // trigger an event by Register form
    wrapper.find('form').simulate('submit');
    expect(Register.prototype.onRegisterUser.calledOnce).toBe(true);
  });
  it('should check that there are input text field for all parameters', () => {
    expect(wrapper.find('input').first().props().name).toBe('fullName');
    expect(wrapper.find('input').at(1).props().name).toBe('username');
  });
  it('Should check that number of form fields is equal to 6',
    () => {
      expect(wrapper.find('input').length).toBe(6);
    });
  it('Should check that there is a sign in submit button', () => {
    expect(wrapper.find('button').text()).toBe('sign Up');
    expect(wrapper.find('button').props().type).toBe('submit');
  });
});
