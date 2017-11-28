import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import {
  MessageInputForm
} from '../../../client/src/js/components/Partials/MessageInputForm';

describe('<MessageInputForm />', () => {
  const props = testMockData.messageInputProps;
  sinon.spy(MessageInputForm.prototype, 'handleSubmit');
  sinon.spy(MessageInputForm.prototype, 'handleChange');

  const wrapper = mount(
    <HashRouter>
      <MessageInputForm {...props} />
    </HashRouter>);

  wrapper.setState({
    priority: testMockData.priority,
    message: testMockData.longString
  });

  it('should render the MessageInputForm component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain the onLoginUser method', () => {
    // trigger an event by Login form
    wrapper.find('form').simulate('submit');
    expect(MessageInputForm.prototype.handleSubmit.calledOnce).toBe(true);
  });

  it('should check that there is an input text field for message',
    () => {
      expect(wrapper.find('input').first().props().name).toBe('message');
    });

  it('Should check that number of form input field is equal to 2',
    () => {
      expect(wrapper.find('input').length).toBe(2);
    });
});
