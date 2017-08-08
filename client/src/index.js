import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Reveal from "react-reveal";
import "animate.css/animate.css";

import "./stylesheet/index.css";
import configureStore from "./stores/configureStore";

import { Home,
        Register,
        Login,
        ResetPassword,
        NotFound,
        Dashboard,
        MessageBoard,
        CreateGroupBoard } from "./components/main";
// import { Auth } from "./components/containers";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/dashboard/message" component={MessageBoard}/>
            <Route
                exact path="/dashboard/create-group"
                component={CreateGroupBoard}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
</Provider>, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
