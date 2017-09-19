import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Api from "../../utils/api";
import { onLogoutUser } from "../../actions/authAction";
import { fetchUserGroups } from "../../actions/groupAction";
import '../../../styles/index.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasShownToaster: false
    }
    this.callToaster = this.callToaster.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { username } = nextProps
    if (username) {
      this.callToaster(username);
    }
  }


  callToaster(username) {
    // Add a toastr welcome mesage here.
    if (this.state.hasShownToaster !== true) {
      Materialize.toast(`Welcome ${username}, let's PostiT`, 3000);
      this.setState({
        hasShownToaster: true
      });
    }
  }
  render() {
    const { fullName, username } = this.props;
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text">
          <div className="card-panel welcome teal-text">
            <h2 className="center-align">Welcome {fullName}</h2>
            <h4 className="left-align center">
              You don&rsquo;t have to shout. <br />
              <span className="right-align flow-text">
                Just POSTiT!!!
                        </span>
            </h4>
            <div className="row">
              <br />
              <div className="col m8 row">
                <form>
                  <div className="input-field search col s12">
                    <i className="icon ion-ios-search prefix right"></i>
                    <input type="search"
                      id="searchArea"
                      placeholder="search"
                      className="teal white-text" />
                  </div>
                </form>
              </div>
              <div className="col m4">
                <p>
                  <span className="flow-text or">or </span> &nbsp;
                    <Link className="btn createGroup waves-effect"
                      to="/dashboard/create-group">
                      Create Group
                    </Link>
                </p>
              </div>
              <br /><br /><br /><br />
              <div className="aboutBox row">
                <div className="col s12">
                  <h5 className="left-align">About Us</h5>
                  <p>
                    Is a simple application that allows
                    friends and colleagues create groups
                    for notifications. This way one person
                    can post notifications to everyone by
                    sending a message once - a broadcast
                    message. The application allows people
                    create accounts, create groups and add
                    registered users to the groups, and
                    then send messages out to these groups
                    whenever they want.
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
  // fetchUserGroups: PropTypes.func.isRequired,
  username: PropTypes.string,
  fullName: PropTypes.string
}


export default withRouter(Dashboard);
