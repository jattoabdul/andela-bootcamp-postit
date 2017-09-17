import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Api from '../../utils/api';
import {
  fetchMessages,
  handleSendMessage } from '../../actions/groupAction';
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
      groupMessages: [],
      msg_err: '',
      username: '',
      fullName: '',
      currentGroup: null,
      activeMessageReaders: []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
  }

  componentWillReceiveProps(nextProps) {
		const { authData: { currentUserData },
			groupData: { currentGroup, groupMessages } } = nextProps;
		console.log(`currentMessages on message component:`, groupMessages);
		this.setState({
      username: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.username : '',
      fullName: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.fullName : '',
      groupMessages: !isEmpty(groupMessages) ? groupMessages : [],
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null
		});
  }

  appendChatMessage(priority, text) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    console.log('on message board on send message', groupId);
    // const gId = `${this.props.match.params.groupId}`;
    // make Api call to send msg here
    this.props.handleSendMessage(groupId, priority, text).then(
      (item) => {
        this.props.fetchMessages(groupId);
      }
    );
  }

  updateReadBy(id) {
    const updateMessageParams = `id=${id}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(updateMessageParams, `/api/v1/groups/${gId}/message/read`, "POST")
      .then((response) => {
        console.log("Response: ", response);
      });
  }

  render() {
    const { fullName, username, currentGroup, groupMessages } = this.state;
    return (
      <div id="chatArea" className="white-text row no-marginbtm">
        <div id="chatBoard" className="col s11">
          {/* this.state.messageBody ?
              <MessageBody messages={this.state.messages}
              closeMessageBody={this.closeMessageBody}/> : */}
          <MessageList updateReadBy={this.updateReadBy}
            username={username}
            fullName={fullName}
            messages={groupMessages} />
          <MessageInputForm appendChatMessage={this.appendChatMessage} />
        </div>
        <UserView activeMessageReaders={this.state.activeMessageReaders} />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  fetchMessages: PropTypes.func,
  handleSendMessage: PropTypes.func,
  groupData: PropTypes.object,
	authData: PropTypes.object
}

const mapDispatchToProps = {
  fetchMessages,
  handleSendMessage
}

function mapStateToProps({ authData, groupData }){
  return {
      authData,
      groupData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageBoard));
