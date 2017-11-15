import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import { Login } from '../../../client/src/js/components/Main/Login';

describe('<Login />', () => {
  const props = testMockData.loginProps;

  // spy on onLoginUser of Login Component
  sinon.spy(Login.prototype, 'onLoginUser');

  sinon.spy(Login.prototype, 'closeError');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <Login {...props} />
      </HashRouter>
    </Provider>);
  wrapper.setState({
    username: mockData.username,
    password: mockData.password,
    isLoading: true,
    error_message: undefined
  });

  it('should render the Login component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain the onLoginUser method', () => {
    // trigger an event by Login form
    wrapper.find('form').simulate('submit');
    expect(Login.prototype.onLoginUser.calledOnce).toBe(true);
  });

  it('should check that there is an input text field for username and password',
    () => {
      expect(wrapper.find('input').first().props().name).toBe('username');
      expect(wrapper.find('input').at(1).props().name).toBe('password');
    });

  it('Should check that number of form fields is equal to 2',
    () => {
      expect(wrapper.find('input').length).toBe(2);
    });

  it('Should check that there is a sign in submit button', () => {
    expect(wrapper.find('button').text()).toBe('sign in');
    expect(wrapper.find('button').props().type).toBe('submit');
  });
});
