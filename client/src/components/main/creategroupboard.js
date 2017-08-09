import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/CreateGroupBoard.css"; // CreateGroupBoard.scss

class CreateGroupBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.state = {
      error: ""
    };
  }

  // OnCreateGroup Method
  onCreateGroup(e) {
    e.preventDefault();
    if (this.name.value === "") {
      console.log("name cannot be empty");
    }
    if (this.desc.value === "") {
      console.log("desc cannot be empty");
    }
    console.log(`${this.name.value} --- ${this.desc.value}
        ---- ${this.selectedUsers} array (potential group members) `);
    // checking if user is logged in
    if (sessionStorage.getItem("user") === null) {
      window.location = "/login";
    }
    const groupCreateParams = `name=${this.name.value}&desc=${this.desc.value}`;
    // making calls to the create group API endpoint
    Api(groupCreateParams, "/api/groups/", "POST").then(
        (createGroupResponse) => {
          console.log(createGroupResponse);
          window.location = "/dashboard/message";
        }
    );
  }

  render() {
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container">
                <div className="card-panel formPanel">
                    <form>
                        <div className="input-field col s12">
                        <input type="text" id="group_name-create"
                        ref={ (input) => { this.name = input; } } required/>
                        <label htmlFor="group_name-create">Group Name</label>
                        </div>
                        <div className="input-field col s12">
                        <textarea id="group_desc-create"
                        className="materialize-textarea"
                        ref={ (input) => { this.desc = input; } }>
                        </textarea>
                        <label htmlFor="group_desc-create">
                            Group Description
                        </label>
                        </div>
                        <div className="col s12 teal-text">
                        Add User (s):
                        <div className="input-field inline">
                            <input id="add_users" type="text"
                                className="validate"
                                ref={ (input) => { this.selectedUsers = input; } }/>
                            <label htmlFor="add_users">Users</label>
                        </div>
                        </div>
                        <div className="col s12">
                        <p className="center">
                            <button
                                className="btn-large waves-effect waves-light"
                                onClick={this.onCreateGroup}>
                                Create Group
                            </button>
                        </p>
                        </div>
                        <ul>
                        <li><a href="">@jattoade</a></li>
                        <li><a href="">@shery</a></li>
                        <li><a href="">@joe</a></li>
                        <li><a href="">@ratcoder</a></li>
                        </ul>
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

export default CreateGroupBoard;
