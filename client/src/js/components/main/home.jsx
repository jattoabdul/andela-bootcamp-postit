import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Welcome } from "./../partials/";
import '../../../styles/index.scss';

class Home extends React.Component {
constructor(props) {
super(props);
}

componentWillMount() {
  if (sessionStorage.getItem('user') !== null) {
    // redirecting
    this.props.history.push('/dashboard');
  }
}

render() {
return (
<div id="indexContainer" className="teal lighten-5">
<div id="mainContainer" className="row">
<Welcome />
<div className="col s12 m6 indexSideTwo flexCentered">
<h3 className="alt-logo center-align">
<i className="icon ion-speakerphone"></i> POSTiT
</h3>
<div className="home-mobile">
<Link to="/login" className="teal btn waves-effect waves-light">
Login
</Link>
<p className="flow-text">
New to POSTiT?
</p>
<Link to="/register" className="btn cyan waves-effect waves-light">
Create an account
</Link>
</div>
</div>
</div>
</div>
);
}
}

export default withRouter(Home);
