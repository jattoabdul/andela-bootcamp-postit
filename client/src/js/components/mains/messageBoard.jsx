import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SideMenu,
    MainNav,
    UserView,
    MessageList,
    MessageInputForm } from "./../partials/";
import { createNewGroup,
    addUserToGroup,
    fetchUserGroups } from './../../actions/groupActions';
import { logout } from './../../actions/loginActions';
import { getGroupMessage, createNewGroupMessage } from './../../actions/messagesActions';

class MessageBoard extends React.Component {
    constructor(props) {
        super(props);
      }
      

      componentDidMount() {
        this.props.getGroupMessage();
      }
      

      render() {
        const { isAuthenticated, user } = this.props.login;
        const { groupMessages } = this.props.messages;
        return (
            <div id="dashContainer" className="teal lighten-5">
              <div id="appContainer" className="row no-marginbtm">
                <SideMenu />
                <div id="appBoard" className="col s10 m9 l10 no-padding">
                  <MainNav />
                  <div id="chatArea" className="white-text row no-marginbtm">
                    <div id="chatBoard" className="col s11">
                    <MessageList messages={groupMessages} />
                    <MessageInputForm />
                    </div>
                    <UserView />
                  </div>
                </div>
                </div>
            </div>
        );
      }
}

function mapStateToProps( { login, group, messages }) {
    return {
        login,
        group,
        messages
    }
}

const mapDispatchToProps = {
  getGroupMessage
}


MessageBoard.PropTypes = {
login: PropTypes.object.isRequired,
group: PropTypes.object.isRequired,
messages: PropTypes.object.isRequired,
getGroupMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageBoard));
