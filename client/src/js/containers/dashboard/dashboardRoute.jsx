import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../../components/main';
import Dashboard from './../../containers/dashboard/dashboard';
import CreateGroupBoard from './../../containers/dashboard/creategroupboard';
import AddUserToGroupBoard from './../../containers/dashboard/addUserToGroup';
import MessageBoard from '../../containers/dashboard/messageboard';

/**
 * DashBoard Routes
 * @param {*} props 
 * @return {any} Route
 */
const DashboardRoutes = props => (
  <Switch>
    <Route exact path="/dashboard" render={() => <Dashboard {...props} />} />
    <Route
      path="/dashboard/create-group"
      render={() => <CreateGroupBoard {...props} />}
    />
    <Route
      path="/dashboard/:groupId/addusertogroup"
      render={() => <AddUserToGroupBoard {...props} />}
    />
    <Route
      path="/dashboard/messages/:groupId"
      render={() => <MessageBoard {...props} />}
    />
    <Route component={NotFound} />
  </Switch>
);

export default DashboardRoutes;
