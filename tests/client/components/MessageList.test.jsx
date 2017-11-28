import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import {
  MessageList
} from '../../../client/src/js/components/Partials/MessageList';

describe('<MessageList />', () => {
  const props = testMockData.messageListProps;

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <MessageList {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    listed: true
  });

  it('should render the MessageList component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a chat container div', () => {
    expect(wrapper.find('.chat').exists()).toBe(true);
  });
});
