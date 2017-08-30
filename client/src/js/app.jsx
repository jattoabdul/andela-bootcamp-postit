import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import 'materialize-loader';
import 'materialize-css'
import 'materialize-css/dist/js/materialize.min';

import js from './utils/htmlAction';
import { Home,
    Register,
    Login,
    Dashboard } from './components/mains'; 
import '../styles/index.scss';

const store = createStore(
    // param1 root reducer - reducers take state and action and returns newStates
    (state = {}) => state, 
    // param2 initialState - 
    // param3 ApplyMiddleware - 
    applyMiddleware(thunk)
);

 render(
    <Provider store={store}> 
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
    </Provider>, document.getElementById('app')); 
 