import React from "react";
import ReactDOM from "react-dom";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./stylesheet/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
