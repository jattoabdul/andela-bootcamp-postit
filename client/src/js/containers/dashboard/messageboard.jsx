import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import isEmpty from 'lodash/isEmpty';
import Api from '../../utils/api';
import {
  fetchMessages,
  handleSendMessage,
  resetCurrentGroup,
  onRemoveUser
} from '../../actions/groupAction';
import {
  UserView,
  MessageList,
  MessageInputForm
} from './../../components/partials';
import '../../../styles/index.scss';

/**
 * @class MessageBoard
 */
class MessageBoard extends React.Component {
  /**
   * constructor function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      groupMessages: !isEmpty(props.groupMessages) ? props.groupMessages : [],
      msg_err: '',
      username: '',
      fullName: '',
      currentGroup: !isEmpty(props.currentGroup) ? props.currentGroup : {},
      currentGroupMembers: !isEmpty(props.currentGroupMembers)
        ? props.currentGroupMembers
        : []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
    this.removeGroupMember = this.removeGroupMember.bind(this);
  }

  /**
   * 
   * @param {*} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const {
      authData: { currentUserData },
      groupData: { currentGroup, groupMessages, currentGroupMembers }
    } = nextProps;
    this.setState({
      username:
        !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
          ? currentUserData.data.username
          : '',
      fullName:
        !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
          ? currentUserData.data.fullName
          : '',
      groupMessages: !isEmpty(groupMessages) ? groupMessages : [],
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
      currentGroupMembers: !isEmpty(currentGroupMembers)
        ? currentGroupMembers
        : []
    });
  }

  /**
   * @return {void}
   */
  componentWillUnmount() {
    this.props.resetCurrentGroup();
  }

  /**
   * 
   * @param {*} priority 
   * @param {*} text
   * @return {void}
   */
  appendChatMessage(priority, text) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    // make Api call to send msg here
    this.props.handleSendMessage(groupId, priority, text);
  }

  /**
   * 
   * @param {*} userId
   * @return {void}
   */
  removeGroupMember(userId) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to do this.',
      childrenElement: () => <div>Custom UI</div>,
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.props.onRemoveUser(userId, groupId)
        .then((res) => {
        // eslint-disable-next-line
        Materialize.toast(res.message, 3000);
        }),
      // eslint-disable-next-line
      onCancel: () => Materialize.toast('thanks for changing your mind', 3000),
    });
  }

  /**
   * 
   * @param {*} id
   * @return {void}
   */
  updateReadBy(id) {
    const updateMessageParams = `id=${id}`;
    // eslint-disable-next-line
    const gId = `${this.props.match.params.groupId}`;
    Api(
      updateMessageParams,
      `/api/v1/groups/${gId}/message/read`,
      'POST'
    ).then((response) => {
      // console.log("Response: ", response);
    });
  }

  /**
   * @return {dom} DomElement
   */
  render() {
    const {
      fullName,
      username,
      currentGroupMembers,
      groupMessages
    } = this.state;
    return (
      <div id="chatArea" className="white-text row no-marginbtm">
        <div id="chatBoard" className="col s11">
          {isEmpty(groupMessages) ? (
            <p className="center grey-text">No Messages Yet</p>
          ) : (
            <MessageList
              updateReadBy={this.updateReadBy}
              username={username}
              fullName={fullName}
              messages={groupMessages}
            />
          )}
          <MessageInputForm appendChatMessage={this.appendChatMessage} />
        </div>
        <UserView
          activeMessageReaders={currentGroupMembers}
          removeGroupMember={this.removeGroupMember}
        />
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
};

const mapDispatchToProps = {
  fetchMessages,
  handleSendMessage,
  resetCurrentGroup,
  onRemoveUser
};

/**
 * 
 * @param {object} authData
 * @param {object} groupData
 * @return {void}
 */
function mapStateToProps({ authData, groupData }) {
  return {
    authData,
    groupData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MessageBoard)
);
