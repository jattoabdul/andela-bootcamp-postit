import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Api from '../../utils/api';
import {
  fetchMessages,
  handleSendMessage,
  resetCurrentGroup,
  onRemoveUser } from '../../actions/groupAction';
import {
  UserView,
  MessageList,
  MessageInputForm
} from './../../components/partials';
import '../../../styles/index.scss';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupMessages: !isEmpty(props.groupMessages) ? props.groupMessages : [],
      msg_err: '',
      username: '',
      fullName: '',
      currentGroup: !isEmpty(props.currentGroup) ? props.currentGroup : {},
      currentGroupMembers: !isEmpty(props.currentGroupMembers) ? props.currentGroupMembers : []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
    this.removeGroupMember = this.removeGroupMember.bind(this);
  }

  componentWillReceiveProps(nextProps) {
		const { authData: { currentUserData },
			groupData: { currentGroup, groupMessages, currentGroupMembers } } = nextProps;
		this.setState({
      username: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.username : '',
      fullName: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.fullName : '',
      groupMessages: !isEmpty(groupMessages) ? groupMessages : [],
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
      currentGroupMembers: !isEmpty(currentGroupMembers) ? currentGroupMembers : [],
		});
  }

  componentWillUnmount() {
    this.props.resetCurrentGroup();
  }

  appendChatMessage(priority, text) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    // make Api call to send msg here
    this.props.handleSendMessage(groupId, priority, text);
  }

  removeGroupMember(userId) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    const checkConfirmation = confirm('are you sure you want to delete this user?');
    if (checkConfirmation) {
      this.props.onRemoveUser(userId, groupId).then(
        (res) => {
          Materialize.toast(res.message, 3000);
        }
      );
    }
  }

  updateReadBy(id) {
    const updateMessageParams = `id=${id}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(updateMessageParams, `/api/v1/groups/${gId}/message/read`, "POST")
      .then((response) => {
        // console.log("Response: ", response);
      });
  }

  render() {
    const { fullName, username, currentGroup, currentGroupMembers, groupMessages } = this.state;
    return (
      <div id="chatArea" className="white-text row no-marginbtm">
        <div id="chatBoard" className="col s11">
          {
            isEmpty(groupMessages) ?
            <p className="center grey-text">No Messages Yet</p> :
            <MessageList updateReadBy={this.updateReadBy}
              username={username}
              fullName={fullName}
              messages={groupMessages} />

          }
          <MessageInputForm appendChatMessage={this.appendChatMessage} />
        </div>
        <UserView
          activeMessageReaders={this.state.currentGroupMembers}
          removeGroupMember={this.removeGroupMember} />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  fetchMessages: PropTypes.func,
  handleSendMessage: PropTypes.func,
  onRemoveUser: PropTypes.func,
  handleOnResetCurrentGroup: PropTypes.func,
  resetCurrentGroup: PropTypes.func,
  groupData: PropTypes.object,
	authData: PropTypes.object
}

const mapDispatchToProps = {
  fetchMessages,
  handleSendMessage,
  resetCurrentGroup,
  onRemoveUser
}

function mapStateToProps({ authData, groupData }){
  return {
      authData,
      groupData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageBoard));
