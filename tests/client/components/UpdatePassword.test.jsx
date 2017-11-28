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
  UpdatePassword
} from '../../../client/src/js/components/Main/UpdatePassword';

describe('<UpdatePassword />', () => {
  const props = testMockData.resetPasswordProps;
  sinon.spy(UpdatePassword.prototype, 'onResetPassword');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <UpdatePassword {...props} />
      </HashRouter>
    </Provider>);
  wrapper.setState({
    responseMessage: mockData.emptyString,
    hasStatus: true,
    requestButtonClassName: 'btn waves-effect waves-light'
  });

  it('should render the UpdatePassword component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should check that there are input text field for all parameters', () => {
    expect(wrapper.find('input').first().props().type).toBe('password');
  });

  it('Should check that number of form fields is equal to 1',
    () => {
      expect(wrapper.find('input').length).toBe(1);
    });

  it('Should check that there is a sign in submit button', () => {
    expect(wrapper.find('button').text()).toBe('Update my password');
    expect(wrapper.find('button').props().type).toBe('submit');
  });
});
