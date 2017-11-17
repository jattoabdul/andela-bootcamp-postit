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
  AddUserToGroupBoard
} from '../../../client/src/js/containers/Dashboard/AddUserToGroupBoard';

describe('<AddUserToGroupBoard />', () => {
  const props = testMockData.addUserToGroupBoardProps;

  sinon.spy(AddUserToGroupBoard.prototype, 'onShowGroupMessages');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <AddUserToGroupBoard {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    error: mockData.emptyString,
    currentGroup: mockData.currentGroup,
    selectedUsers: mockData.selectedUsers,
    currentGroupId: mockData.number
  });

  it('should render the AddUserToGroupBoard component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a container for the group board', () => {
    expect(wrapper.find('#chatArea').exists()).toBe(true);
  });

  it('Should check that there is a container for add user to group form',
    () => {
      expect(wrapper.find('.centerContainerForForms').exists()).toBe(true);
    });

  it('should contain the addUserToGroup Form', () => {
    expect(wrapper.find('form').at(0).exists()).toBe(true);
  });

  it('should check that there is an input text field for username search query',
    () => {
      expect(wrapper.find('input').first().props().type).toBe('search');
    });

  it('Should check that there is a span element with instructions', () => {
    expect(wrapper.find('span').at(0).text())
      .toBe('Search For Registered User and Add to Group Below:');
  });

  it('Should have not react paginate component without values in selectedUser',
    () => {
      expect(wrapper.find('ReactPaginate').exists()).toBe(false);
    });

  it('Should check that there is a ul element that holds search result', () => {
    expect(wrapper.find('ul').at(0).exists()).toBe(true);
  });

  it('Should check that there is a button with enter Group text', () => {
    expect(wrapper.find('button').at(1).text()).toBe('Enter Group');
  });

  it('Should check that there is a button with Search text', () => {
    expect(wrapper.find('button').at(0).text()).toBe('Search');
  });
});
