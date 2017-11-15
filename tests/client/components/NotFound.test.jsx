import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import testMockData from '../../__mock__/testDummy';
import {
  NotFound
} from '../../../client/src/js/components/Main/NotFound';

describe('<NotFound />', () => {
  const props = testMockData.notFound;

  const wrapper = shallow(<NotFound {...props} />);

  it('should render the NotFound component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should check that there is a sign in submit button', () => {
    expect(wrapper.find('button').text()).toBe('Go Home');
    expect(wrapper.find('img').props().alt).toBe('page not found');
  });
});
