import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';
import chai, { expect } from 'chai';
// import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';

// import { Welcome } from './../../client/src/js/components/partials/welcome';
import {Home} from '../../client/src/js/components/main/home';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const renderer = new ShallowRenderer();

describe('Home Components', () => {
  // renderer.render(<Home />);
  // const result = renderer.getRenderOutput();
  // it('should be defined', () => {
  //   expect(result).toBeDefined();
  // });

  it('should have 6 div', () => {
    // const wrapper = mount(<Home />);
    // expect(wrapper).toBeDefined();
    // expect(wrapper.find('div')).to.have.length(0);
  });
});
