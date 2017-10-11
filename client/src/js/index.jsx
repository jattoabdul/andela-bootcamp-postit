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
import configureStore from './stores/configureStore';
import './htmlAction';

import {
  Home,
  Register,
  Login,
  ResetPassword,
  UpdatePasswordForm,
  NotFound
} from './components/main';
import BaseDashboard from './containers/dashboard';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const app = document.getElementById('root');

const isTokenExpired = () => {
  const token = jwt.decode(JSON.parse(sessionStorage.getItem('user')).token);
  const date = new Date(0);
  date.setUTCDate(token.exp);
  return date < new Date();
};

const isAuthenticated = () => {
  const authState = sessionStorage.getItem('user') !== null &&
    isTokenExpired !== true;
  return authState;
};

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route
          path="/updatepassword/:hash"
          component={UpdatePasswordForm}
        />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
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
registerServiceWorker();
