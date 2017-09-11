import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/loginActions.js';

import 'materialize-loader';
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min';

import './utils/htmlAction';
import { Home,
    Register,
    Login,
    Dashboard,
    CreateGroupBoard,
    AddUserBoard,
    MessageBoard,
    NotFound } from './components/mains'; 
import rootReducer from './rootReducer.js';
import '../styles/index.scss';

const store = createStore(
    // param1 root reducer - reducers take state and action and returns newStates
    rootReducer, 
    // param2 initialState -
    // param3 ApplyMiddleware -
    /* eslint-disable no-underscore-dangle */
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
    /* eslint-enable */
);
const token = sessionStorage.getItem('user');

if (token) {
    const userDetails = JSON.parse(token);
    const decodedUserDetails = jwt.decode(userDetails.token);
    // console.log(decodedUserDetails, 'user info');
    store.dispatch(setCurrentUser(decodedUserDetails));
}

// const root = document.createElement('div');
// document.body.appendChild(root);
 render(
    <Provider store={store}> 
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/create-group" component={CreateGroupBoard}/>
                <Route path="/add/:groupId/user" component={AddUserBoard}/>
                <Route exact path="/dashboard/:groupId/message" component={MessageBoard}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </Provider>, document.getElementById('app')); 
//  document.getElementById('app')
