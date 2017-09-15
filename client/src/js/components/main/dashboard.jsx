import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Api from "../../utils/api";
import { SideMenu, MainNav } from "./../partials/";
import { onLogoutUser } from "../../actions/authAction";
import { fetchUserGroups } from "../../actions/groupAction";
import '../../../styles/index.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      userGroups: null,
      username: "",
      fullName: ""
    };
    this.onLogOut = this.onLogOut.bind(this);
    this.callToaster = this.callToaster.bind(this);
  }
  // check if user is authenticated!
  componentWillMount() {
    if (sessionStorage.getItem("user") === null) {
      // eslint-disable-next-line
      this.props.history.push(`/login`);
      return;
    }
    this.props.fetchUserGroups();
  }



  componentWillReceiveProps(nextProps){
    const { authData: { currentUserData},
            groupData: { userGroups } } = nextProps;
    console.log(`userGroups on dashboard:`, userGroups);
    this.setState({
        userGroups: !isEmpty(userGroups) ? userGroups : null,
        username: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
         ? currentUserData.data.username : '',
        fullName: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
         ? currentUserData.data.fullName : '',
        });
    if (currentUserData && currentUserData.data) {
        this.callToaster(currentUserData.data.username);
    }
  }

  onLogOut() {
    this.props.onLogoutUser();
    // redirecting
    this.props.history.push('/login');
  }


  callToaster(username){
    // Add a toastr welcome mesage here.
    Materialize.toast(`Welcome ${username}, let's PostiT`, 4000);
  }
  render() {
      const { fullName, username, userGroups } = this.state;
    return (
        <div id="dashContainer" className="teal lighten-5">
            <div id="appContainer" className="row no-marginbtm">
                <SideMenu
                    {...this.props}
                    username={username}
                    fullName={fullName}
                    userGroups={userGroups}
                    handleLogout={this.onLogOut}/>
                <div id="appBoard" className="col s10 m9 l10 no-padding">
                    <MainNav />
                    <br/>
                    <div id="chatArea" className="white-text">
                        <div className="card-panel welcome teal-text">
                            <h2 className="center-align">Welcome {fullName}</h2>
                            <h4 className="left-align center">
                                You don&rsquo;t have to shout. <br/>
                                <span className="right-align flow-text">
                                    Just POSTiT!!!
                                </span>
                            </h4>
                            <div className="row">
                            <br/>
                            <div className="col m8 row">
                                <form>
                                    <div className="input-field search col s12">
                                    <i className="icon ion-ios-search prefix right"></i>
                                        <input type="search"
                                            id="searchArea"
                                            placeholder="search"
                                            className="teal white-text"/>
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
                            <br/><br/><br/><br/>
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
            </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
    fetchUserGroups: PropTypes.func.isRequired,
    onLogoutUser: PropTypes.func,
    groupData: PropTypes.object.isRequired,
    authData: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    fetchUserGroups,
    onLogoutUser
}

function mapStateToProps({ authData, groupData }){
    console.log('ths is group data', groupData)
    return {
        authData,
        groupData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
