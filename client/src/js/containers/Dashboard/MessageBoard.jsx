import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import isEmpty from 'lodash/isEmpty';
import Api from '../../utils/api';
import {
  handleSendMessage,
  resetCurrentGroup,
  onAddUser,
  onSearchUser,
  onRemoveUser
} from '../../actions/groupAction';
import {
  UserView,
  MessageList,
  MessageInputForm
} from './../../components/Partials';
import '../../../styles/index.scss';

/**
 * Display MessageBoard
 * @class MessageBoard
 * @extends {React.Component}
 * @param {any} props
 */
class MessageBoard extends React.Component {
  /**
   * Creates an instance of MessageBoard
   * @param {any} props
   * @memberof MessageBoard
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      groupMessages: !isEmpty(props.groupMessages) ? props.groupMessages : [],
      msg_err: '',
      username: '',
      fullName: '',
      selectedUsers: [],
      isSelected: [],
      currentGroup: !isEmpty(props.currentGroup) ? props.currentGroup : {},
      currentGroupMembers: !isEmpty(props.currentGroupMembers)
        ? props.currentGroupMembers
        : []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
    this.onSearchUserInGroup = this.onSearchUserInGroup.bind(this);
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
    this.removeGroupMember = this.removeGroupMember.bind(this);
  }

  /**
   * componentWillReceiveProps Life Cycle Method
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
   * componentWillUnmount Life Cycle Method
   * @return {void}
   */
  componentWillUnmount() {
    this.props.resetCurrentGroup();
    this.setState({
      isSelected: []
    });
  }

  /**
   * onSearchUserInGroup Method
   * @param {number} id
   * @param {string} searchText
   * @return {void}
   */
  onSearchUserInGroup(id, searchText) {
    if (!searchText) {
      this.setState({
        selectedUsers: []
      });
    }
    // call searchUserAction
    this.props.onSearchUser(id, searchText).then(
      (searchItem) => {
        this.setState({
          selectedUsers: searchItem
        });
      }
    );
  }

  /**
   * onAddUserToGroup Method
   * @param {*} uId
   * @return {void} 
   */
  onAddUserToGroup(uId) {
    // eslint-disable-next-line
    const id = `${this.props.match.params.groupId}`;
    // call addUser action
    this.props.onAddUser(uId, id).then(
      // eslint-disable-next-line
      (item) => {
        this.setState({
          isSelected: [...this.state.isSelected, uId]
        });
        // eslint-disable-next-line
        Materialize.toast(`user was added succesfully`, 3000);
      }
    );
  }

  /**
   * appendChatMessage Method
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
   * removeGroupMember Method
   * @param {*} userId
   * @return {void}
   */
  removeGroupMember(userId) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to do this.',
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
   * updateReadBy Method
   * @param {*} id
   * @return {void}
   */
  updateReadBy(id) {
    const updateMessageParams = `id=${id}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(
      updateMessageParams,
      `/api/v1/groups/${gId}/message/read`,
      'POST'
    ).then((response) => {
      // eslint-disable-next-line
      Materialize.toast(response.message, 3000);
    });
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    const {
      fullName,
      username,
      selectedUsers,
      isSelected,
      currentGroup,
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
          selectedUsers={selectedUsers}
          currentGroup={currentGroup}
          isSelected={isSelected}
          activeMessageReaders={currentGroupMembers}
          removeGroupMember={this.removeGroupMember}
          onSearchUserInGroup={this.onSearchUserInGroup}
          onAddUserToGroup={this.onAddUserToGroup}
        />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  onSearchUser: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  resetCurrentGroup: PropTypes.func.isRequired,
  groupData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  authData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]).isRequired,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]).isRequired,
  currentGroupMembers: PropTypes.arrayOf(PropTypes.object),
  currentGroup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  groupMessages: PropTypes.arrayOf(PropTypes.object).isRequired
};

MessageBoard.defaultProps = {
  currentGroup: {},
  groupMessages: [],
  currentGroupMembers: []
};

const mapDispatchToProps = {
  handleSendMessage,
  resetCurrentGroup,
  onSearchUser,
  onAddUser,
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
