import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router,
  Route, Switch, Redirect } from 'react-router-dom';
import 'materialize-loader';
import 'materialize-css';
import 'materialize-css/dist/js/materialize.min';
import jwt from 'jsonwebtoken';

import '../styles/index.scss';
import './../../src/favicon.ico';
import configureStore from './stores/configureStore';
import './htmlAction';
import {
  Home,
  Register,
  Login,
  ResetPassword,
  UpdatePassword,
  NotFound
} from './components/Main';
import BaseDashboard from './containers/Dashboard';

const store = configureStore();

const app = document.getElementById('root');

/**
 * @param {void} void
 * @return {object} date
 */
const isTokenExpired = () => {
  const token = jwt.decode(JSON.parse(sessionStorage.getItem('user')).token);
  const date = new Date(0);
  date.setUTCDate(token.exp);
  return date < new Date();
};

/**
 * @param {void} void
 * @return {object} authState
 */
const isAuthenticated = () => {
  const authState = sessionStorage.getItem('user') !== null &&
    isTokenExpired !== true;
  return authState;
};

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            (isAuthenticated() ? (<Redirect to={{ pathname: '/dashboard' }} />)
              : (<Home {...props} />))}
        />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route
          path="/updatepassword/:hash"
          component={UpdatePassword}
        />
        <Route
          path="/register"
          render={props =>
            (isAuthenticated() ? (<Redirect to={{ pathname: '/dashboard' }} />)
              : (<Register {...props} />))}
        />
        <Route
          path="/login"
          render={props =>
            (isAuthenticated() ? (<Redirect to={{ pathname: '/dashboard' }} />)
              : (<Login {...props} />))}
        />
        <Route
          path="/dashboard"
          render={props =>
            (isAuthenticated() ? (<BaseDashboard {...props} />)
              : (<Redirect to={{ pathname: '/login' }} />))}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>, app);
