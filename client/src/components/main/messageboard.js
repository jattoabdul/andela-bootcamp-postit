import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu,
        MainNav,
        UserView,
        MessageList,
        MessageInputForm } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageBoard.css"; // MessageBoard.scss

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg_err: ""
    };
    this.appendChatMessage = this.appendChatMessage.bind(this);
  }

  componentDidMount() {
    const gId = `${this.props.match.params.groupId}`;
    Api(null, `/api/groups/${gId}/messages/`, "GET")
      .then((response) => {
        console.log("Response of messages from db: ", ...response);
        // const newMessageList = JSON.parse(response);
        // console.log(newMessageList);
        this.setState({ messages: [...this.state.messages, ...response] });
        console.log("current value of state messages: ", this.state.messages);
      });
  }
  appendChatMessage(priority, text) {
    // const newMessage = {
    //   id: this.state.messages.length + 1,
    //   timestamp: new Date().getTime(),
    //   priority,
    //   text
    // };
    // make Api call to send msg here
    const messageParams = `text=${text}&&priority=${priority}`;
    const gId = `${this.props.match.params.groupId}`;
    Api(messageParams, `/api/groups/${gId}/message/`, "POST")
      .then((response) => {
        console.log("Response: ", ...response);
        this.setState({ messages: [...this.state.messages, ...response] });
      });
    // this.setState({ messages: [...this.state.messages, newMessage] });
  }
  render() {
    return (
        <div id="dashContainer" className="teal">
          <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
              <MainNav />
              <div id="chatArea" className="white-text row no-marginbtm">
                <div id="chatBoard" className="col s11">
                  <MessageList messages={this.state.messages} />
                  <MessageInputForm appendChatMessage={this.appendChatMessage}/>
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
