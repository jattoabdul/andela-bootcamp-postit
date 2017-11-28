import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { HashRouter } from 'react-router-dom';
import mockData from '../../__mock__/dummy';
import testMockData from '../../__mock__/testDummy';
import { UserView } from '../../../client/src/js/components/Partials/UserView';

describe('<UserView />', () => {
  const props = testMockData.userViewProps;
  sinon.spy(UserView.prototype, 'onSearchingUserInGroup');
  sinon.spy(UserView.prototype, 'handlePageClick');

  const wrapper = mount(<HashRouter>
    <UserView {...props} />
  </HashRouter>);

  wrapper.setState({
    scroll: true,
    searchQuery: mockData.emptyString
  });

  it('should render the UserView component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain the addUserToGroup modal Form', () => {
    wrapper.find('.modal-trigger').simulate('click');
    expect(wrapper.find('#modal1').at(0).exists()).toBe(true);
    expect(wrapper.find('form').at(0).exists()).toBe(true);
  });

  it('Should have not react paginate component',
    () => {
      expect(wrapper.find('ReactPaginate').exists()).toBe(false);
    });

  it('Should have ReactTooltip component',
    () => {
      expect(wrapper.find('ReactTooltip').at(0).length).toBe(1);
    });

  it('Should have two ul to hold all group members and user search modal',
    () => {
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('ul').length).toBe(2);
    });
});
