import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from '../../components/Main';
import Dashboard from './../../containers/Dashboard/Dashboard';
import CreateGroupBoard from './../../containers/Dashboard/CreateGroupBoard';
import
AddUserToGroupBoard from './../../containers/Dashboard/AddUserToGroupBoard';
import MessageBoard from '../../containers/Dashboard/MessageBoard';

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
