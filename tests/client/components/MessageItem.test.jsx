import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import {
  MessageItem
} from '../../../client/src/js/components/Partials/MessageItem';

describe('<MessageItem />', () => {
  const props = testMockData.messageItemProps;

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <MessageItem {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    recievedMessage: true
  });

  it('should render the MessageItem component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is an image tag with the user\'s avatar', () => {
    expect(wrapper.find('img').props().className).toBe('left');
  });

  it('Should check that there is a div that contains each message item', () => {
    expect(wrapper.find('.message').exists()).toBe(true);
  });
});
