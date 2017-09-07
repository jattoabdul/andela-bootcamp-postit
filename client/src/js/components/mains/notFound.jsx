import React from "react";
// import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

class NotFound extends React.Component {

  render() {
    return (
        <div>
            <h2>
                Page Not Found, go home
            </h2>
        </div>
    );
  }
}

export default withRouter(NotFound);
