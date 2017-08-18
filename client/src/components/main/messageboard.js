import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import { Toast } from "react-materialize";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu,
        MainNav,
        UserView,
        MessageList,
        MessageBody,
        MessageInputForm } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageBoard.css"; // MessageBoard.scss

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg_err: "",
      username: "",
      fullName: "",
      messageBody: false
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
    this.openMessageBody = this.openMessageBody.bind(this);
    this.closeMessageBody = this.closeMessageBody.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("user") !== null) {
      Api(null, `/api/user/`, "GET").then(
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
      Api(null, `/api/groups/${gId}/messages/`, "GET")
        .then((response) => {
          console.log("Response of messages from db: ", ...response);
          this.setState({ messages: [...this.state.messages, ...response] });
          console.log("current value of state messages: ", this.state.messages);
        });
    } else {
      window.location = `/login`;
    }
  }

  componentWillUnmount() {
    this.setState({ messages: [] });
  }
  appendChatMessage(priority, text) {
    // make Api call to send msg here
    const messageParams = `text=${text}&&priority=${priority}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(messageParams, `/api/groups/${gId}/message/`, "POST")
      .then((response) => {
        console.log("Response: ", ...response);
        this.setState({ messages: [...this.state.messages, ...response] });
      });
    // this.forceUpdate();
    // this.setState({ messages: [...this.state.messages, newMessage] });
  }

  openMessageBody(e) {
    e.preventDefault();
    this.setState({ messageBody: true });
  }

  closeMessageBody(e) {
    e.preventDefault();
    this.setState({ messageBody: false });
  }
  render() {
    return (
        <div id="dashContainer" className="teal lighten-5">
          <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
              <MainNav />
              <div id="chatArea" className="white-text row no-marginbtm">
                <div id="chatBoard" className="col s11">
                { this.state.messageBody ?
                <MessageBody messages={this.state.messages}
                  closeMessageBody={this.closeMessageBody}/> :
                <MessageList openMessageBody={this.openMessageBody}
                  username={this.state.username}
                  fullName={this.state.fullName}
                  messages={this.state.messages} />
                }
                { this.state.messageBody ? null :
                <MessageInputForm appendChatMessage={this.appendChatMessage}/>
                }
                </div>
                <UserView />
              </div>
            </div>
            </div>
        </div>
    );
  }
}

export default MessageBoard;
