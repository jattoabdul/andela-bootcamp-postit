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
  CreateGroupBoard
} from '../../../client/src/js/containers/Dashboard/CreateGroupBoard';

describe('<CreateGroupBoard />', () => {
  const props = testMockData.createGroupBoardProps;

  sinon.spy(CreateGroupBoard.prototype, 'onCreateGroup');

  const wrapper = mount(
    <Provider>
      <HashRouter>
        <CreateGroupBoard {...props} />
      </HashRouter>
    </Provider>);

  wrapper.setState({
    error: mockData.emptyString,
    name: mockData.string,
    desc: mockData.longString
  });

  it('should render the CreateGroupBoard component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a container for the group board', () => {
    expect(wrapper.find('#chatArea').exists()).toBe(true);
  });

  it('Should check that there is a container for create group form', () => {
    expect(wrapper.find('.centerContainerForForms').exists()).toBe(true);
  });

  it('should contain the createGroup Form', () => {
    expect(wrapper.find('form').at(0).exists()).toBe(true);
  });

  it('Should check that there is a button with create group text', () => {
    expect(wrapper.find('button').at(0).text()).toBe('Create Group');
  });
});
