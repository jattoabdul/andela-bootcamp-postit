import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/CreateGroupBoard.css"; // CreateGroupBoard.scss

class AddUserToGroupBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.onCreateGroup = this.onCreateGroup.bind(this);
    this.state = {
      error: "",
      selectedUsers: null
    };
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
  }

  // OnaddUserToGroup Method
  onAddUserToGroup(e) {
    e.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    // console.log(this.props.match.params.groupId);
    const searchText = this.selectedUsers.value;
    if (!searchText) {
      this.setState({
        selectedUsers: null
      });
    }
    console.log(searchText);
    Api(null, `/api/groups/${id}/usersearch?search=${searchText}`, "GET").then(
        (createGroupResponse) => {
          console.log(createGroupResponse);
          this.setState({
            selectedUsers: createGroupResponse.searchItemResult
          });
        //   window.location = "/dashboard/addusertogroup";
        // this.props.history.push(`/messageboard/${groupId}`);
        }
    );
  }
  // render Method
  render() {
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container centerContainerForForms">
                <div className="card-panel formPanel">
                    <form className="centerForm">
                        <div className="col s12 teal-text">
                        Add User (s):
                        <div className="input-field inline">
                            <input id="add_users" type="search"
                                className="validate"
                                ref={ (input) => {
                                  this.selectedUsers = input;
                                }
                                 }
                                onKeyUp={this.onAddUserToGroup}/>
                            <label htmlFor="add_users">Users</label>
                        </div>
                        </div>
                        <div className="col s12">
                        <ul>
                            { this.state.selectedUsers !== null ?
                                    this.state.selectedUsers.map(selectedUser => <li key={selectedUser.id}>
                                        <a href="">@{selectedUser.username}</a>
                                        </li>)
                                : this.state.selectedUsers
                            }
                        </ul>
                        </div>
                        <div className="col s12">
                            <p className="center">
                                <button className="btn-large waves-effect waves-light"
                                onClick={this.onAddUserToGroup}>Search</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
    );
  }
}

export default AddUserToGroupBoard;
