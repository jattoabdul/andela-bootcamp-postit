import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
import toastr from 'toastr';
import Api from "../../utils/api";
import { SideMenu,
        MainNav,
        UserView,
        MessageList,
        MessageInputForm } from "./../partials/";
// import {
//     onLogoutUser } from "../../actions/authAction";
import '../../../styles/index.scss';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg_err: "",
      username: "",
      fullName: "",
      activeMessageReaders: []
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.updateReadBy = this.updateReadBy.bind(this);
    this.gotoAddUserToGroup = this.gotoAddUserToGroup.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("user") !== null) {
      Api(null, `/api/v1/user/`, "GET").then(
            (userGroupsResponse) => {
              console.log(`=======> user details with group res:
                `, userGroupsResponse.data);
              this.setState({
                username: userGroupsResponse.data.username,
                fullName: userGroupsResponse.data.fullName
              });
            }
        );
      const gId = `${this.props.match.params.groupId}`;
      Api(null, `/api/v1/groups/${gId}/messages/`, "GET")
        .then((response) => {
          console.log("Response of messages from db: ", ...response);
          this.setState({ messages: [...this.state.messages, ...response] });
          console.log("current value of state messages: ", this.state.messages);
        });
      toastr.success('Welcome', {timeOut: 3000})
    }
  }

  // componentWillUnmount() {
  //   this.setState({ messages: [] });
  // }

  appendChatMessage(priority, text) {
    // make Api call to send msg here
    const messageParams = `text=${text}&&priority=${priority}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(messageParams, `/api/v1/groups/${gId}/message/`, "POST")
      .then((response) => {
        console.log("Response: ", ...response);
        this.setState({ messages: [...this.state.messages, ...response] });
      });
    // refetch messages and update state
    // this.forceUpdate();
    // this.setState({ messages: [...this.state.messages, newMessage] });
  }

  gotoAddUserToGroup(e) {
    e.preventDefault();
    const gId = `${this.props.match.params.groupId}`;
    window.location = `/#/dashboard/${gId}/addusertogroup`;
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
    return (
        <div id="dashContainer" className="teal lighten-5">
          <div id="appContainer" className="row no-marginbtm">
            <SideMenu gotoAddUserToGroup={this.gotoAddUserToGroup}/>
            <div id="appBoard" className="col s10 m9 l10 no-padding">
              <MainNav />
              <div id="chatArea" className="white-text row no-marginbtm">
                <div id="chatBoard" className="col s11">
                {/* this.state.messageBody ?
                <MessageBody messages={this.state.messages}
                closeMessageBody={this.closeMessageBody}/> : */}
                <MessageList updateReadBy={this.updateReadBy}
                  username={this.state.username}
                  fullName={this.state.fullName}
                  messages={this.state.messages} />
                <MessageInputForm appendChatMessage={this.appendChatMessage}/>
                </div>
                <UserView activeMessageReaders={this.state.activeMessageReaders}/>
              </div>
            </div>
            </div>
        </div>
    );
  }
}

export default MessageBoard;
