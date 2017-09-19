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
      groupMessages: !isEmpty(props.groupMessages) ? props.groupMessages : [],
      msg_err: '',
      username: '',
      fullName: '',
      currentGroup: !isEmpty(props.currentGroup) ? props.currentGroup : {},
      activeMessageReaders: []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
  }
  
  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps) {
		const { authData: { currentUserData },
			groupData: { currentGroup, groupMessages } } = nextProps;
		this.setState({
      username: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.username : '',
      fullName: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
      ? currentUserData.data.fullName : '',
      groupMessages: !isEmpty(groupMessages) ? groupMessages : [],
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
      activeMessageReaders: !isEmpty(currentGroup) && !isEmpty(currentGroup.users) ? currentGroup.users : [],
		});
  }

  appendChatMessage(priority, text) {
    const group = this.state.currentGroup;
    const groupId = group.id;
    // make Api call to send msg here
    this.props.handleSendMessage(groupId, priority, text);
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
    const { fullName, username, currentGroup, activeMessageReaders, groupMessages } = this.state;
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
