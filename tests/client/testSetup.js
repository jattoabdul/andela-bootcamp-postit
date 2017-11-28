process.env.NODE_ENV = 'test';
const jsdom = require('jsdom');
const sessionStorage = require('mock-local-storage');
const sinon = require('sinon');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'localhost:3000'
});
global.document = dom.window.document;
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.sessionStorage = window.sessionStorage;
global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  tooltip: () => null,
  dropdown: () => null,
  material_select: () => null,
  on: () => null
});

global.event = {
  target: {
    name: 'input',
    value: 'input'
  }
};

global.Materialize = {
  toast: sinon.spy()
};

const exposedProperties = ['window', 'navigator', 'document'];

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

const user = {
  message: 'jattoade has successfully logged in',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJqYXR0b2FkZSIsImVtYWlsIjoiamF0dG9hZGVAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJBbWludWphdHRvIEFiZHVscWFoaGFyIiwicGhvbmVOdW1iZXIiOiIwODE2Mjc0MDg1MCJ9LCJpYXQiOjE1MDg1MDM1MTIsImV4cCI6MTUwODU4OTkxMn0.W01Xjf3f1UpReT-qfX6RbncKxIfhamo9GSVOWV16uI8'
};

global.HTMLElement = window.HTMLElement;

Object.defineProperty(sessionStorage, 'sessionStorage', { value: { user } });

const noop = () => null;

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
