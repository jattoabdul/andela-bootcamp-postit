import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Reveal from "react-reveal";
import "animate.css/animate.css";

import "./stylesheet/index.css";
import { Home } from "./components/main";
// import {Indexboard} from "./components/containers";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
<Provider>
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
        </div>
    </Router>
</Provider>, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
