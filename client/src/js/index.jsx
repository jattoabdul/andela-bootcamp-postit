import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import 'materialize-loader';
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min';
// import jwt from 'jsonwebtoken';

import { setCurrentUser } from './actions/authAction.js';
import '../styles/index.scss';
import configureStore from "./stores/configureStore";
import "./htmlAction";

import { Home,
        Register,
        Login,
        ResetPassword,
        UpdatePassword,
        NotFound,
        Dashboard,
        MessageBoard,
        CreateGroupBoard,
        AddUserToGroupBoard } from "./components/main";
import BaseDashboard from "./containers/dashboard";

import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

const app = document.getElementsByTagName('div')[0];

render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route path="/updatepassword/:hash"
                component={UpdatePassword}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={BaseDashboard}/>
        </Switch>
    </Router>
</Provider>, app);
registerServiceWorker();
// document.getElementById("root")
