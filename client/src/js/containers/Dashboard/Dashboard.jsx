/* global Materialize */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Display Dashboard
 * @class Dashboard
 * @extends {React.Component}
 * @param {any} props
 */
export class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard
   * 
   * @param {any} props
   * 
   * @memberof Dashboard
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      hasShownToaster: false
    };
    this.callToaster = this.callToaster.bind(this);
  }

  /**
   * componentWillRecieveProps Life Cycle Method
   * 
   * @param {object} nextProps
   * 
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { username } = nextProps;
    if (username) {
      this.callToaster(username);
    }
  }

  /**
   * callToaster Method
   * 
   * @param {string} username
   * 
   * @return {void}
   */
  callToaster(username) {
    // Add a toastr welcome mesage here.
    if (this.state.hasShownToaster !== true) {
      Materialize.toast(`Welcome ${username}, let's PostiT`, 3000);
      this.setState({
        hasShownToaster: true
      });
    }
  }

  /**
   * Render Method
   * 
   * @return {dom} DomElement
   */
  render() {
    const { fullName } = this.props;
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text">
          <div className="card-panel welcome teal-text">
            <h2 className="fName center-align">Welcome {fullName}</h2>
            <h4 className="left-align center">
              You don&rsquo;t have to shout. <br />
              <span className="right-align flow-text">Just POSTiT!!!</span>
            </h4>
            <div className="row">
              <br />
              <div className="col m12">
                <p className="center">
                  <Link
                    className="btn createGroup waves-effect"
                    to="/dashboard/create-group"
                  >
                    Create Group
                  </Link>
                </p>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="aboutBox row">
                <div className="col s12">
                  <h5 className="left-align">About Us</h5>
                  <p>
                    Is a simple application that allows friends and colleagues
                    create groups for notifications. This way one person can
                    post notifications to everyone by sending a message once - a
                    broadcast message. The application allows people create
                    accounts, create groups and add registered users to the
                    groups, and then send messages out to these groups whenever
                    they want.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired
};

export default withRouter(Dashboard);
