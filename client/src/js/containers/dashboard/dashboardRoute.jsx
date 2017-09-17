import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./../../containers/dashboard/dashboard";
import CreateGroupBoard from "./../../containers/dashboard/creategroupboard";
import AddUserToGroupBoard from "./../../containers/dashboard/addUserToGroup";
import MessageBoard from "./../../containers/dashboard/messageBoard";
const DashboardRoutes = (props) => (
	<Switch>
		<Route exact path="/dashboard" render={()=> <Dashboard {...props}/>}/>
		<Route
			path="/dashboard/create-group"
			render={()=> <CreateGroupBoard {...props}/>} />
		<Route path="/dashboard/:groupId/addusertogroup"
			render={()=> <AddUserToGroupBoard {...props}/>} />
		<Route path="/dashboard/messages/:groupId"
		 render={()=> <MessageBoard {...props}/>} />
	</Switch>
);


export default DashboardRoutes;