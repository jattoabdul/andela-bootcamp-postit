import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import testMockData from '../../__mock__/testDummy';
import
Pagination from '../../../client/src/js/components/Partials/Pagination';

describe('<Pagination />', () => {
  const props = testMockData.paginationProps;

  const wrapper = mount(<HashRouter>
    <Pagination {...props} />
  </HashRouter>);

  it('should render the Pagination component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have react paginate component',
    () => {
      expect(wrapper.find('PaginationBoxView').at(0).length).toBe(1);
    });
});
