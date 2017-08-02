// absolute imports
import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.css";

// relative imports
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";


ReactDOM.render(< App />, document.getElementById("root"));
registerServiceWorker();
