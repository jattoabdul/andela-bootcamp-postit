// absolute imports
import React from "react";
import ReactDOM from "react-dom";
// import injectTapEventPlugin from "react-tap-event-plugin";
import "bootstrap/dist/css/bootstrap.css";

// relative imports
import "./stylesheet/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

// Needed for onTouchTap
// injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
