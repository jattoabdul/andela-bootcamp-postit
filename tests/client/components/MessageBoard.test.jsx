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
  MessageBoard
} from '../../../client/src/js/containers/Dashboard/MessageBoard';

describe('<MessageBoard />', () => {
  const props = testMockData.messageBoardProps;

  sinon.spy(MessageBoard.prototype, 'onAddUserToGroup');
  sinon.stub(MessageBoard.prototype, 'appendChatMessage', () => true);

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <MessageBoard {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    groupMessages: mockData.groupMessages,
    msg_err: mockData.emptyString,
    username: mockData.emptyString,
    fullName: mockData.emptyString,
    selectedUsers: mockData.emptyArray,
    totalPageCount: 0,
    isSelected: mockData.emptyArray,
    currentGroup: mockData.currentGroup,
    currentGroupMembers: mockData.emptyArray
  });

  it('should render the MessageBoard component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a container for the group board', () => {
    expect(wrapper.find('#chatArea').exists()).toBe(true);
  });

  it('Should check that there is a container for messages in a group', () => {
    expect(wrapper.find('#chatBoard').exists()).toBe(true);
  });

  it('Should check that there is a message when no messages available', () => {
    expect(wrapper.find('p').at(0).text()).toBe('No Messages Yet');
  });

  it('should contain the appendChatMessage method', () => {
    // trigger an event by MessageInputForm Component
    expect(wrapper.find('form').at(0).exists()).toBe(true);
  });

  it('should contain the MessageInputForm Component', () => {
    // trigger an event by MessageInputForm Component
    expect(wrapper.find('MessageInputForm').length).toBe(1);
    wrapper.find('form').at(0).simulate('submit');
    expect(MessageBoard.prototype.appendChatMessage.calledOnce).toBe(true);
  });

  it('should contain the UserView Component', () => {
    // trigger an event by UserView Component
    expect(wrapper.find('UserView').length).toBe(1);
  });

  it('should not contain the MessageList Component for empty messages state',
    () => {
    // trigger an event by MessageList Component
      expect(wrapper.find('MessageList').length).toBe(0);
    });

  it('should contain the onAddUserToGroup method', () => {
    // trigger an event by MessageInputForm Component
    expect(wrapper.find('form').at(1).exists()).toBe(true);
    wrapper.setState({
      isSelected: [1]
    });
    wrapper.find('form').at(1).simulate('submit');
    const call = MessageBoard.prototype.onAddUserToGroup;
    expect(call.calledOnce).toBe(false);
  });

  it('Should have an area in the UserView Component for group members', () => {
    expect(wrapper.find('#usersScroll').at(0).length).toBe(1);
  });

  it('Should have an area in the MessageInputForm Component to add message',
    () => {
      expect(wrapper.find('#messageBox').at(0).length).toBe(1);
    });

  it('Should have ReactTooltip component',
    () => {
      expect(wrapper.find('ReactTooltip').at(0).length).toBe(1);
    });

  it('Should have an area in the UserView Component to search for users',
    () => {
      expect(wrapper.find('.bottomSearch').at(0).length).toBe(1);
    });
});
